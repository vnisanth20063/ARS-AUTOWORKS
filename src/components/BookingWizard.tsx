import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { catalogue, groups, itemBySlug, titleOfSlug, type GroupId } from '../data/catalogue';
import { labourPrices, partsPrices, servicePrices } from '../data/pricing';
import { vehicleBrands } from '../data/site';
import { submitRequest, type SubmitResult } from '../utils/submit';
import { formatPrice } from '../utils/cart';
import Field, { isEmail, isMobileNumber, today, validYear } from './Field';

const steps = ['Vehicle', 'Services', 'Inspection', 'Estimate', 'Appointment', 'Summary'];
const times = ['Morning (9am – 12pm)', 'Afternoon (12pm – 4pm)', 'Evening (4pm – 7pm)'];
const fuels = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid', 'Other'];
interface Plan { repair: string; items: { name: string; condition: string; decision: string; estimate: string | null }[] }
const readPlan = (): Plan | null => { try { return JSON.parse(localStorage.getItem('ars-inspection-plan') || 'null'); } catch { return null; } };

export default function BookingWizard() {
  const { items, add, remove, clear } = useCart();
  const [step, setStep] = useState(0);
  const [v, setV] = useState({ brand: '', model: '', year: '', reg: '', fuel: '' });
  const [s, setS] = useState({ date: '', time: '', pickup: 'self', address: '' });
  const [c, setC] = useState({ name: '', mobile: '', email: '', notes: '' });
  const [rep, setRep] = useState({ on: false, component: '', pref: '', compat: '' });
  const [g, setG] = useState<GroupId | 'all'>('all');
  const [q, setQ] = useState('');
  const [plan, setPlan] = useState<Plan | null>(null);
  const [usePlan, setUsePlan] = useState(true);
  const [err, setErr] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState('');
  const [done, setDone] = useState<null | { res: SubmitResult; lines: string[] }>(null);
  useEffect(() => setPlan(readPlan()), []);

  const svc = items.filter((i) => i.kind === 'service');
  const pkg = items.filter((i) => i.kind === 'package');
  const list = useMemo(() => catalogue.filter((x) => (g === 'all' || x.group === g) && `${x.title} ${x.short}`.toLowerCase().includes(q.toLowerCase()) && !svc.some((i) => i.id === x.slug)).slice(0, 12), [g, q, svc]);

  const validate = (n: number) => {
    const e: Record<string, string> = {};
    if (n === 0) {
      if (!v.brand) e.brand = 'Select a vehicle brand.';
      if (!v.model.trim()) e.model = 'Enter the model.';
      if (!validYear(v.year)) e.year = 'Enter a four-digit year.';
      if (v.reg.trim().length < 4) e.reg = 'Enter the registration number.';
      if (!v.fuel) e.fuel = 'Select a fuel type.';
    }
    if (n === 1) {
      if (items.length === 0 && !rep.on) e.items = 'Add at least one service, package or replacement enquiry.';
      if (rep.on && !rep.component.trim()) e.component = 'Enter the required component.';
      if (rep.on && !rep.pref) e.pref = 'Choose OEM or OEM+.';
    }
    if (n === 4) {
      if (!s.date) e.date = 'Choose a preferred date.'; else if (s.date < today()) e.date = 'Choose today or a later date.';
      if (!s.time) e.time = 'Choose a preferred time.';
      if (s.pickup !== 'self' && s.address.trim().length < 5) e.address = 'Enter the pickup address.';
    }
    if (n === 5) {
      if (c.name.trim().length < 2) e.name = 'Enter your name.';
      if (!isMobileNumber(c.mobile)) e.mobile = 'Enter a valid mobile number.';
      if (c.email && !isEmail(c.email)) e.email = 'Enter a valid email or leave it empty.';
    }
    setErr(e); return Object.keys(e).length === 0;
  };
  const next = () => { if (validate(step)) { setStep(step + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } };

  const submit = async () => {
    if (!validate(5)) return;
    setBusy(true); setFail('');
    try {
      const lines = [...svc, ...pkg].map((i) => titleOfSlug(i.id));
      const res = await submitRequest('booking-guided', { vehicle: v, schedule: s, customer: c, services: items, replacement: rep.on ? rep : null, inspectionPlan: usePlan ? plan : null });
      setDone({ res, lines }); clear();
      try { localStorage.removeItem('ars-inspection-plan'); } catch { /* ignore */ }
    } catch (e) { setFail(e instanceof Error ? e.message : 'Something went wrong. Please try again.'); } finally { setBusy(false); }
  };

  if (done) return (
    <div className="card p-8" aria-live="polite">
      <CheckCircle2 className="text-ember" size={36} aria-hidden />
      <h2 className="headline mt-4 text-3xl">Booking request prepared</h2>
      <p className="mt-3 max-w-xl text-mist">Reference {done.res.reference}. ARS has not confirmed any appointment – a request is not a confirmed booking.</p>
      {!done.res.sent && <p className="demo-note mt-4 max-w-xl">Demo mode: no server is connected, so this request is saved on this device only and has not been sent to ARS. You can see it in your <Link className="underline" to="/dashboard">dashboard</Link>.</p>}
      <p className="mt-4 text-sm text-mist">Services: {done.lines.join(', ') || 'None'}</p>
      <Link to="/services" className="btn-ghost mt-8">Back to services</Link>
    </div>
  );

  const rowsFor = svc.map((i) => ({ slug: i.id, title: titleOfSlug(i.id), total: servicePrices[i.id] ?? null, labour: labourPrices[i.id] ?? null, parts: partsPrices[i.id] ?? null }));
  const addl = usePlan && plan ? plan.items.filter((i) => i.decision === 'approved') : [];

  return (
    <div>
      <ol className="mb-8 flex flex-wrap gap-2" aria-label="Booking steps">
        {steps.map((n, i) => (
          <li key={n}><button type="button" disabled={i > step} onClick={() => setStep(i)} aria-current={i === step ? 'step' : undefined} className={`chip !min-h-[38px] !py-1.5 ${i === step ? 'chip-on' : i < step ? 'border-ember/60' : 'opacity-50'}`}>{i + 1}. {n}</button></li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset className="grid gap-5 sm:grid-cols-2">
          <legend className="mb-4 font-display text-xl font-semibold">Your vehicle</legend>
          <Field id="w-brand" label="Brand" error={err.brand}><select id="w-brand" className="field" value={v.brand} onChange={(e) => setV({ ...v, brand: e.target.value })}><option value="">Select brand</option>{vehicleBrands.map((b) => <option key={b}>{b}</option>)}</select></Field>
          <Field id="w-model" label="Model" error={err.model}><input id="w-model" className="field" value={v.model} onChange={(e) => setV({ ...v, model: e.target.value })} /></Field>
          <Field id="w-year" label="Year" error={err.year}><input id="w-year" className="field" inputMode="numeric" maxLength={4} value={v.year} onChange={(e) => setV({ ...v, year: e.target.value })} /></Field>
          <Field id="w-reg" label="Registration number" error={err.reg}><input id="w-reg" className="field uppercase" value={v.reg} onChange={(e) => setV({ ...v, reg: e.target.value })} /></Field>
          <Field id="w-fuel" label="Fuel type" error={err.fuel}><select id="w-fuel" className="field" value={v.fuel} onChange={(e) => setV({ ...v, fuel: e.target.value })}><option value="">Select fuel</option>{fuels.map((f) => <option key={f}>{f}</option>)}</select></Field>
        </fieldset>
      )}

      {step === 1 && (
        <div>
          <h2 className="font-display text-xl font-semibold">Service category and selected services</h2>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Category">
            <button type="button" className={`chip ${g === 'all' ? 'chip-on' : ''}`} onClick={() => setG('all')}>All</button>
            {groups.map((x) => <button key={x.id} type="button" className={`chip ${g === x.id ? 'chip-on' : ''}`} onClick={() => setG(x.id)}>{x.label}</button>)}
          </div>
          <label htmlFor="w-q" className="sr-only">Search services</label>
          <input id="w-q" type="search" className="field mt-4 max-w-md" placeholder="Search services" value={q} onChange={(e) => setQ(e.target.value)} />
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {list.map((x) => <li key={x.slug}><button type="button" onClick={() => add('service', x.slug)} className="w-full rounded-lg border border-line bg-charcoal px-4 py-3 text-left text-sm hover:border-ember">+ {x.title}</button></li>)}
          </ul>
          <h3 className="mt-8 font-semibold">Selected</h3>
          {items.length === 0 ? <p className="mt-2 text-sm text-mist">Nothing selected yet.</p> : (
            <ul className="mt-3 flex flex-wrap gap-2">{items.map((i) => (
              <li key={`${i.kind}-${i.id}`} className="flex items-center gap-2 rounded-full border border-line bg-charcoal py-1 pl-4 pr-1 text-sm">{titleOfSlug(i.id)}<button type="button" onClick={() => remove(i.kind, i.id)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10" aria-label={`Remove ${titleOfSlug(i.id)}`}>×</button></li>
            ))}</ul>
          )}
          {err.items && <p role="alert" className="err">{err.items}</p>}
          <label className="mt-8 flex items-center gap-3 text-sm"><input type="checkbox" className="h-5 w-5 accent-[#e11d2e]" checked={rep.on} onChange={(e) => setRep({ ...rep, on: e.target.checked })} /> I also need an OEM / OEM+ replacement service</label>
          {rep.on && (
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <Field id="w-comp" label="Required component" error={err.component}><input id="w-comp" className="field" value={rep.component} onChange={(e) => setRep({ ...rep, component: e.target.value })} /></Field>
              <Field id="w-pref" label="Preference" error={err.pref}><select id="w-pref" className="field" value={rep.pref} onChange={(e) => setRep({ ...rep, pref: e.target.value })}><option value="">Select</option><option>OEM</option><option>OEM+</option></select></Field>
              <div className="sm:col-span-2"><Field id="w-compat" label="Compatibility details" hint="Variant, engine, VIN or part number if you have it."><textarea id="w-compat" rows={3} className="field" value={rep.compat} onChange={(e) => setRep({ ...rep, compat: e.target.value })} /></Field></div>
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-display text-xl font-semibold">Related inspection options</h2>
          <p className="mt-2 max-w-2xl text-mist">ARS inspects components connected to your repair. Replacement depends on findings and your approval.</p>
          {plan ? (
            <div className="card mt-5 p-5">
              <label className="flex items-center gap-3 text-sm"><input type="checkbox" className="h-5 w-5 accent-[#e11d2e]" checked={usePlan} onChange={(e) => setUsePlan(e.target.checked)} /> Include my inspection plan: {plan.repair}</label>
              <ul className="mt-3 space-y-1 text-sm text-mist">{plan.items.map((i) => <li key={i.name}>• {i.name} – {i.condition} ({i.decision}){i.estimate ? ` · estimate ₹${i.estimate}` : ''}</li>)}</ul>
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-line p-6"><p className="text-mist">No inspection plan attached.</p><Link to="/related-parts-inspection" className="btn-ghost mt-4">Build one in Related Parts Inspection</Link></div>
          )}
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="font-display text-xl font-semibold">Estimate</h2>
          <p className="demo-note mt-3">ARS has not supplied approved prices. Lines show “Request a quote” until figures are configured in <code>src/data/pricing.ts</code>.</p>
          <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm">
            <thead className="text-xs uppercase tracking-widest text-mist"><tr><th className="py-2">Service</th><th>Labour</th><th>Parts</th><th>Total</th></tr></thead>
            <tbody>{rowsFor.map((r) => <tr key={r.slug} className="border-t border-line"><td className="py-3 pr-3">{r.title}</td><td>{formatPrice(r.labour)}</td><td>{formatPrice(r.parts)}</td><td>{formatPrice(r.total)}</td></tr>)}
              {addl.map((a) => <tr key={a.name} className="border-t border-line"><td className="py-3 pr-3">Additional work: {a.name}</td><td>–</td><td>–</td><td>{a.estimate ? `₹${a.estimate}` : 'Request a quote'}</td></tr>)}
              {rowsFor.length + addl.length === 0 && <tr><td colSpan={4} className="py-4 text-mist">No services selected.</td></tr>}</tbody></table></div>
        </div>
      )}

      {step === 4 && (
        <fieldset className="grid gap-5 sm:grid-cols-2">
          <legend className="mb-4 font-display text-xl font-semibold">Preferred appointment</legend>
          <Field id="w-date" label="Date" error={err.date}><input id="w-date" type="date" min={today()} className="field" value={s.date} onChange={(e) => setS({ ...s, date: e.target.value })} /></Field>
          <Field id="w-time" label="Time" error={err.time}><select id="w-time" className="field" value={s.time} onChange={(e) => setS({ ...s, time: e.target.value })}><option value="">Select time</option>{times.map((t) => <option key={t}>{t}</option>)}</select></Field>
          <Field id="w-pick" label="Pickup and drop"><select id="w-pick" className="field" value={s.pickup} onChange={(e) => setS({ ...s, pickup: e.target.value })}><option value="self">I will bring and collect the vehicle</option><option value="pickup">Pickup requested</option><option value="both">Pickup and drop requested</option></select></Field>
          {s.pickup !== 'self' && <Field id="w-addr" label="Pickup address" error={err.address} hint="Pickup availability is confirmed by ARS."><input id="w-addr" className="field" value={s.address} onChange={(e) => setS({ ...s, address: e.target.value })} /></Field>}
          <p className="text-xs text-mist sm:col-span-2">No appointment availability is shown. ARS confirms the slot after your request.</p>
        </fieldset>
      )}

      {step === 5 && (
        <div className="grid gap-8 lg:grid-cols-2">
          <fieldset className="grid gap-5">
            <legend className="mb-4 font-display text-xl font-semibold">Your details</legend>
            <Field id="w-name" label="Customer name" error={err.name}><input id="w-name" className="field" autoComplete="name" value={c.name} onChange={(e) => setC({ ...c, name: e.target.value })} /></Field>
            <Field id="w-mob" label="Mobile number" error={err.mobile}><input id="w-mob" className="field" type="tel" autoComplete="tel" value={c.mobile} onChange={(e) => setC({ ...c, mobile: e.target.value })} /></Field>
            <Field id="w-email" label="Email (optional)" error={err.email}><input id="w-email" className="field" type="email" value={c.email} onChange={(e) => setC({ ...c, email: e.target.value })} /></Field>
            <Field id="w-notes" label="Additional instructions"><textarea id="w-notes" rows={3} className="field" value={c.notes} onChange={(e) => setC({ ...c, notes: e.target.value })} /></Field>
          </fieldset>
          <div className="card h-fit p-6 text-sm">
            <h3 className="font-display text-lg font-semibold">Booking summary</h3>
            <dl className="mt-4 space-y-3">
              <div><dt className="text-mist">Vehicle</dt><dd>{v.brand} {v.model} ({v.year}) · {v.reg.toUpperCase()} · {v.fuel}</dd></div>
              <div><dt className="text-mist">Services</dt><dd>{[...svc, ...pkg].map((i) => titleOfSlug(i.id)).join(', ') || 'None'}</dd></div>
              {rep.on && <div><dt className="text-mist">Replacement enquiry</dt><dd>{rep.component} – {rep.pref}</dd></div>}
              {usePlan && plan && <div><dt className="text-mist">Inspection plan</dt><dd>{plan.repair} · {plan.items.length} item(s)</dd></div>}
              <div><dt className="text-mist">Preferred slot</dt><dd>{s.date}, {s.time} · {s.pickup === 'self' ? 'Self drop-off' : s.pickup === 'pickup' ? 'Pickup' : 'Pickup & drop'}</dd></div>
              <div><dt className="text-mist">Estimate</dt><dd>Request a quote</dd></div>
            </dl>
            {fail && <p role="alert" className="err mt-3">{fail}</p>}
            <button type="button" className="btn-primary mt-6 w-full" disabled={busy} onClick={submit}>{busy ? 'Preparing…' : 'Send booking request'}</button>
            <p className="mt-3 text-xs text-mist">Sending a request does not confirm an appointment.</p>
          </div>
        </div>
      )}

      {step < 5 && (
        <div className="mt-10 flex gap-3">
          {step > 0 && <button type="button" className="btn-ghost" onClick={() => setStep(step - 1)}>Back</button>}
          <button type="button" className="btn-primary" onClick={next}>Continue</button>
        </div>
      )}
      {step === 5 && <button type="button" className="btn-quiet mt-6" onClick={() => setStep(4)}>Back</button>}
    </div>
  );
}
