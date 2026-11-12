import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { services, BRAND_INTRO } from '../data/services';
import { comparisons } from '../data/comparisons';
import { packages } from '../data/packages';
import { groups, itemBySlug } from '../data/catalogue';
import { arsImg, arsVideo, bookingServiceOptions, criticalPartsImages, criticalPartsSteps, durationCopy, faqs, methodSteps, paintProtectionTiers, standard, whyArs } from '../data/ars';
import { conditionMeta } from '../data/inspection';
import { healthSystems } from '../data/health';
import { tiers } from '../data/content';
import { submitRequest } from '../utils/submit';
import { useLiteMotion, useSimpleMode } from '../hooks/useMedia';
import ScrollVideoSection from '../components/ScrollVideoSection';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ServiceCard from '../components/ServiceCard';
import PackageCard from '../components/PackageCard';
import HeroSlider from '../components/HeroSlider';
import InspectionTool from '../components/InspectionTool';
import Faq from '../components/Faq';
import Reveal from '../components/Reveal';
import Field, { isMobileNumber } from '../components/Field';

const H2 = 'headline text-[clamp(2rem,5.5vw,4.5rem)]';

function LazyVideo({ k, className = '' }: { k: string; className?: string }) {
  const v = arsVideo(k);
  const lite = useSimpleMode();
  if (lite) return <img src={v.poster} alt="" loading="lazy" className={className} />;
  return <video className={className} src={v.src} poster={v.poster} muted loop playsInline preload="none" onMouseEnter={(e) => e.currentTarget.play().catch(() => undefined)} onMouseLeave={(e) => e.currentTarget.pause()} onClick={(e) => { const el = e.currentTarget; el.paused ? el.play().catch(() => undefined) : el.pause(); }} aria-label="Service demonstration video – tap to play" />;
}

function QuickRequest() {
  const [f, setF] = useState({ name: '', mobile: '', service: '', message: '' });
  const [e, setE] = useState<Record<string, string>>({});
  const [ref, setRef] = useState<{ reference: string; sent: boolean } | null>(null);
  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = 'Enter your name.';
    if (!isMobileNumber(f.mobile)) er.mobile = 'Enter a valid mobile number.';
    if (!f.service) er.service = 'Select a service.';
    setE(er); if (Object.keys(er).length) return;
    setRef(await submitRequest('quick-request', f));
  };
  if (ref) return <div className="card p-6" aria-live="polite"><h3 className="text-xl font-semibold">Request noted</h3><p className="mt-2 text-mist">Reference {ref.reference}.</p>{!ref.sent && <p className="demo-note mt-3">Demo form – no server is connected, so this was saved on this device only and has not been sent to ARS.</p>}</div>;
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      <Field id="q-name" label="Name" error={e.name}><input id="q-name" className="field" autoComplete="name" value={f.name} onChange={(x) => setF({ ...f, name: x.target.value })} /></Field>
      <Field id="q-mob" label="Mobile number" error={e.mobile}><input id="q-mob" className="field" type="tel" value={f.mobile} onChange={(x) => setF({ ...f, mobile: x.target.value })} /></Field>
      <div className="sm:col-span-2"><Field id="q-svc" label="Service required" error={e.service}><select id="q-svc" className="field" value={f.service} onChange={(x) => setF({ ...f, service: x.target.value })}><option value="">Select service</option>{bookingServiceOptions.map((o) => <option key={o}>{o}</option>)}</select></Field></div>
      <div className="sm:col-span-2"><Field id="q-msg" label="Message (optional)"><textarea id="q-msg" rows={3} className="field" value={f.message} onChange={(x) => setF({ ...f, message: x.target.value })} /></Field></div>
      <div className="sm:col-span-2"><button className="btn-primary">Request service</button><p className="mt-3 text-xs text-mist">Demo form — connect to ARS’s phone / WhatsApp / email before launch. No appointment availability is shown.</p></div>
    </form>
  );
}

export default function Home() {
  const simple = useSimpleMode();
  const lite = useLiteMotion();
  const approved = packages.filter((p) => p.approved);
  const real = comparisons.filter((c) => c.before && c.after);
  const [cmp, setCmp] = useState(0);
  const cur = real[cmp];
  const mech = ['engine-repair', 'brake-repair', 'suspension-repair', 'battery-testing-replacement', 'ac-servicing', 'tyre-replacement'].map((s) => itemBySlug(s)!);

  return (
    <main>
      {/* 2–3 Hero + cinematic imagery */}
      <HeroSlider />

      {/* 4 ARS Standard / philosophy */}
      <section className="section grid gap-12 py-20 sm:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Reveal>
          <p className="eyebrow">The ARS Standard</p>
          <h2 className={`${H2} mt-4`}>{standard.title.split('.')[0]}. <span className="serif-accent">Preserve the machine.</span></h2>
          <p className="mt-8 max-w-xl text-lg text-white/75">{standard.body}</p>
          <p className="mt-4 max-w-xl text-lg text-white">{standard.emphasis}</p>
          <Link to="/about" className="btn-ghost mt-8">Discover ARS</Link>
        </Reveal>
        <Reveal delay={0.1} className="relative">
          <img src={arsImg('studio')} alt="Vehicle in the ARS studio" loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover" />
          <img src={arsImg('polish')} alt="Polishing detail" loading="lazy" className="absolute -bottom-8 -left-4 hidden w-2/5 rounded-xl border-4 border-ink object-cover sm:block" />
        </Reveal>
      </section>

      {/* 5 Restore / Protect / Maintain */}
      <section className="border-y border-line bg-charcoal py-20 sm:py-28">
        <div className="section grid gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-3">
          {[['Restore', 'Clean is not enough.', 'steam'], ['Protect', 'Precision matters.', 'under'], ['Maintain', 'Protection lasts.', 'engine-bay']].map(([t, s, img], i) => (
            <Reveal key={t} delay={i * 0.1} className="group relative min-h-[360px] overflow-hidden bg-ink">
              <img src={arsImg(img)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
              <div className="relative flex h-full min-h-[360px] flex-col justify-end p-8"><p className="eyebrow">0{i + 1}</p><h3 className="headline mt-2 text-4xl sm:text-5xl">{t}.</h3><p className="mt-2 text-white/75">{s}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 6 Service categories – editorial list */}
      <section className="section py-20 sm:py-32">
        <Reveal><p className="eyebrow">What we do</p><h2 className={`${H2} mt-4 max-w-3xl`}>Seven disciplines. <span className="serif-accent">One standard.</span></h2></Reveal>
        <ul className="mt-14 divide-y divide-line border-y border-line">
          {groups.map((g) => (
            <li key={g.id}>
              <Link to={g.route} className="group grid items-center gap-4 py-7 sm:grid-cols-[80px_1fr_220px_40px] sm:gap-8">
                <span className="font-display text-3xl font-bold text-line transition-colors group-hover:text-ember">{g.letter}</span>
                <div><h3 className="font-display text-2xl font-semibold sm:text-3xl">{g.label}</h3><p className="mt-1 max-w-xl text-sm text-mist">{g.blurb}</p></div>
                <div className="hidden h-24 overflow-hidden rounded-lg sm:block"><img src={g.image} alt="" loading="lazy" className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0" /></div>
                <ArrowUpRight className="hidden text-mist transition-colors group-hover:text-ember sm:block" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-mist">Mechanical, electrical, AC and tyre services are request-a-quote and subject to ARS confirmation.</p>
      </section>

      {/* 7 Interactive detailing journey (scroll-controlled video / frame sequences) */}
      <section aria-labelledby="journey" id="journey">
        <div className="section pb-16">
          <p className="eyebrow">Interactive detailing journey</p>
          <h2 id="journey" className={`${H2} mt-4`}>Fresh water wash. Exclusive treatments. Interior restoration.</h2>
          <p className="mt-4 max-w-xl text-mist">{services.length} chapters. {lite ? 'Scroll to move through each frame sequence.' : 'Scroll to play each video forward; scroll back to rewind.'}</p>
          <Link to="/services" className="mt-4 inline-block text-sm text-ember underline">Prefer a simple list? Browse all services</Link>
        </div>
        {simple ? (
          <div className="section grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{services.map((s) => <ServiceCard key={s.slug} service={s} />)}</div>
        ) : services.map((s, i) => <ScrollVideoSection key={s.slug} service={s} index={i} total={services.length} />)}
      </section>

      {/* Interior restoration video demonstrations (original ARS Premium) */}
      <section className="section py-20 sm:py-28">
        <Reveal><p className="eyebrow">Interior restoration</p><h2 className={`${H2} mt-4`}>Inside matters <span className="serif-accent">just as much.</span></h2></Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[['germ-clean', '01 Germ clean', 'Full interior panels'], ['steam-clean', '02 Steam', 'Full interior panels'], ['fabric-extraction', '03 Dirt extraction', 'Fabric seats & floors'], ['plastic-care', '04 Leather & plastic care', 'Restoration of finish and feel']].map(([k, t, d]) => (
            <Reveal key={k}><figure className="overflow-hidden rounded-2xl border border-line"><LazyVideo k={k} className="aspect-[3/4] w-full object-cover" /><figcaption className="p-4"><p className="font-semibold">{t}</p><p className="text-sm text-mist">{d}</p></figcaption></figure></Reveal>
          ))}
        </div>
      </section>

      {/* 8 Mechanical service showcase */}
      <section className="bg-charcoal py-20 sm:py-28">
        <div className="section">
          <Reveal><p className="eyebrow">Mechanical, electrical, AC & tyres</p><h2 className={`${H2} mt-4 max-w-3xl`}>Beyond the finish. <span className="serif-accent">Under the skin.</span></h2><p className="mt-5 max-w-2xl text-mist">Request-a-quote services, subject to ARS confirmation. Images below are illustrative reference imagery, not ARS jobs.</p></Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mech.map((m, i) => (
              <Reveal key={m.slug} delay={i * 0.05}>
                <Link to={`/services/${m.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-line">
                  <img src={m.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[11px] text-gold">Illustrative image</span>
                  <span className="absolute inset-x-0 bottom-0 p-5 font-display text-lg font-semibold">{m.title}</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3"><Link to="/mechanical" className="btn-primary">Mechanical services</Link><Link to="/electrical" className="btn-ghost">Electrical</Link><Link to="/ac-services" className="btn-ghost">AC services</Link></div>
        </div>
      </section>

      {/* 9 Paint correction showcase */}
      <section className="section grid gap-12 py-20 sm:py-32 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="eyebrow">Paint correction</p>
          <h2 className={`${H2} mt-4`}>From imperfection <span className="serif-accent">to reflection.</span></h2>
          <p className="mt-6 text-white/75"><span className="text-mist">Before —</span> Scratches · Swirls · Oxidation · Fading</p>
          <p className="mt-1 text-white/75"><span className="text-mist">After —</span> Gloss · Depth · Clarity · Reflection</p>
          <p className="mt-4 text-sm text-mist">Drag the slider. Sample image supplied for layout — swap for ARS’s own before/after work.</p>
          <Link to="/paint-correction" className="btn-ghost mt-8">Paint correction</Link>
        </Reveal>
        <Reveal delay={0.1}><BeforeAfterSlider before="/ars/ba-before.jpg" after="/ars/ba-after.jpg" title="Paint correction sample layout" illustrative /></Reveal>
      </section>

      {/* 10 Before / after transformations */}
      <section className="border-y border-line bg-charcoal py-20 sm:py-28">
        <div className="section">
          <Reveal><p className="eyebrow">Transformations</p><h2 className={`${H2} mt-4 max-w-3xl`}>See the difference. <span className="serif-accent">Feel the perfection.</span></h2></Reveal>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Choose comparison">
            {real.map((c, i) => <button key={c.id} type="button" aria-pressed={cmp === i} onClick={() => setCmp(i)} className={`chip ${cmp === i ? 'chip-on' : ''}`}>{c.title}</button>)}
          </div>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
            <BeforeAfterSlider key={cur.id} before={cur.before} after={cur.after} title={cur.title} illustrative={cur.illustrative} />
            <div><h3 className="text-2xl font-semibold">{cur.title}</h3><p className="mt-3 max-w-md text-mist">Drag the divider to compare. These images are illustrative and are not presented as verified ARS customer results.</p>
              <div className="mt-6 flex flex-wrap gap-3"><Link to={`/services/${cur.serviceSlug}`} className="btn-primary">View service</Link><Link to="/gallery" className="btn-ghost">Open gallery</Link></div></div>
          </div>
        </div>
      </section>

      {/* 11 Ceramic / graphene / PPF */}
      <section className="section py-20 sm:py-32">
        <Reveal><p className="eyebrow">Paint protection</p><h2 className={`${H2} mt-4`}>Protect the <span className="serif-accent">finish.</span></h2><p className="mt-4 text-sm text-mist">Professional services performed by ARS — not products for sale.</p></Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-5">
          {[...paintProtectionTiers.map((t) => ({ ...t, to: `/services/${t.id}-protection` })), { id: 'ppf', name: 'PPF', text: 'Protective film for vulnerable paint areas. Quote on request.', to: '/ppf' }].slice(0, 5).map((t, i) => (
            <Reveal key={t.id} delay={i * 0.06} className="bg-ink"><Link to={t.to} className="group block h-full p-7 transition-colors hover:bg-graphite"><p className="font-display text-sm text-line group-hover:text-ember">0{i + 1}</p><h3 className="mt-10 font-display text-3xl font-bold">{t.name}</h3><p className="mt-2 text-sm text-mist">{t.text}</p></Link></Reveal>
          ))}
        </div>
        <Link to="/ceramic-graphene" className="btn-primary mt-8">Ceramic & graphene protection</Link>
      </section>

      {/* 12 Critical parts + OEM */}
      <section className="bg-charcoal py-20 sm:py-28">
        <div className="section">
          <Reveal><p className="eyebrow">Critical parts</p><h2 className={`${H2} mt-4 max-w-4xl`}>Critical parts. <span className="serif-accent">Properly restored.</span></h2><p className="mt-5 max-w-2xl text-mist">ARS provides professional cleaning, restoration and replacement support for critical vehicle components, where applicable.</p></Reveal>
          <ol className="mt-8 flex flex-wrap gap-2">{criticalPartsSteps.map((s, i) => <li key={s} className="rounded-full border border-line px-4 py-2 text-sm"><span className="mr-2 text-ember">0{i + 1}</span>{s}</li>)}</ol>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">{criticalPartsImages.map((k) => <img key={k} src={arsImg(k)} alt="Automotive component" loading="lazy" className="aspect-square w-full rounded-xl object-cover" />)}</div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-line p-7"><p className="eyebrow">OEM</p><h3 className="mt-2 text-2xl font-semibold">Original-equipment standard.</h3></div>
            <div className="rounded-2xl border border-line p-7"><p className="eyebrow">OEM +</p><h3 className="mt-2 text-2xl font-semibold">Enhanced or upgraded replacement solutions where appropriate.</h3></div>
          </div>
          <p className="mt-4 text-sm text-mist">Replacement availability and suitability depend on vehicle condition, model and component requirements. You are booking a replacement service, not buying standalone spare parts.</p>
          <Link to="/replacement-services" className="btn-primary mt-8">Request a replacement service</Link>
        </div>
      </section>

      {/* 13 Related parts inspection */}
      <section className="section py-20 sm:py-32">
        <Reveal><p className="eyebrow">Signature · Related parts inspection</p><h2 className={`${H2} mt-4 max-w-4xl`}>We don’t just repair the damaged part.</h2><p className="mt-5 max-w-2xl text-lg text-white/75">We inspect related components to identify wear and potential problems before they become expensive repairs.</p><p className="mt-2 text-xs text-mist">Predefined demonstration – not AI or vehicle diagnostics.</p></Reveal>
        <div className="mt-12"><InspectionTool compact initial="brake" /></div>
      </section>

      {/* 14 Vehicle health report teaser */}
      <section className="border-y border-line bg-charcoal py-20 sm:py-28">
        <div className="section grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal><p className="eyebrow">Digital vehicle health report</p><h2 className={`${H2} mt-4`}>Your vehicle, <span className="serif-accent">read clearly.</span></h2><p className="mt-5 max-w-md text-mist">Condition indicators for engine, brakes, battery, suspension, tyres, AC, transmission and electrical – with recommended maintenance and preventive suggestions.</p><Link to="/vehicle-health-report" className="btn-primary mt-8">Open the sample report</Link></Reveal>
          <div className="grid grid-cols-2 gap-3">{healthSystems.map((s) => <div key={s.id} className="card flex items-center justify-between p-4"><span className="text-sm font-medium">{s.name}</span><span className={`rounded-full border px-2.5 py-0.5 text-xs ${conditionMeta[s.status].tone}`}>{conditionMeta[s.status].label}</span></div>)}</div>
        </div>
      </section>

      {/* 15 ARS Method + duration */}
      <section id="method" className="section py-20 sm:py-32">
        <Reveal><p className="eyebrow">The ARS Method</p><h2 className={`${H2} mt-4`}>Eight steps. <span className="serif-accent">No shortcuts.</span></h2></Reveal>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-4">
          {methodSteps.map((t, i) => <li key={t} className="bg-ink p-7 transition-colors hover:bg-graphite"><b className="font-display text-4xl text-ember">0{i + 1}</b><h3 className="mt-6 text-xl font-semibold">{t}</h3></li>)}
        </ol>
      </section>
      <section className="border-y border-line bg-charcoal py-20 text-center sm:py-28">
        <div className="section max-w-3xl">
          <div className="mx-auto mb-10 h-56 w-56 overflow-hidden rounded-full border border-line sm:h-64 sm:w-64"><LazyVideo k="clock" className="h-full w-full object-cover" /></div>
          <h2 className={H2}>{durationCopy.lead.replace('everything.', '')}<span className="serif-accent">everything.</span></h2>
          <p className="mt-6 font-display text-2xl text-white/80 sm:text-4xl">{durationCopy.sub}</p>
          <p className="mt-6 text-mist">{durationCopy.body}</p>
        </div>
      </section>

      {/* 16 Packages */}
      <section className="section py-20 sm:py-32">
        <Reveal><p className="eyebrow">Service packages</p><h2 className={`${H2} mt-4`}>Combine. <span className="serif-accent">Simplify.</span></h2></Reveal>
        {approved.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{approved.map((p) => <PackageCard key={p.id} pkg={p} />)}</div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{tiers.map((t) => <div key={t.id} className="rounded-2xl border border-dashed border-line p-6"><p className="eyebrow">Coming soon</p><h3 className="mt-3 font-display text-2xl font-semibold">{t.name}</h3><p className="mt-2 text-sm text-mist">{t.text}</p></div>)}</div>
        )}
        <p className="mt-4 text-sm text-mist">Packages are being prepared. You can already choose individual services and request a combined quote.</p>
        <Link to="/packages" className="btn-ghost mt-6">Package interface</Link>
      </section>

      {/* 17 Project gallery strip */}
      <section className="overflow-hidden border-y border-line bg-charcoal py-14">
        <div className="section mb-8 flex items-end justify-between"><h2 className="font-display text-2xl font-semibold">Project gallery</h2><Link to="/gallery" className="text-sm text-ember underline">Open gallery</Link></div>
        <div className="flex w-max animate-marquee gap-4 motion-reduce:animate-none">
          {[...['foam', 'inter', 'polish', 'engine-bay', 'wheel', 'under', 'steam', 'studio'], ...['foam', 'inter', 'polish', 'engine-bay', 'wheel', 'under', 'steam', 'studio']].map((k, i) => <img key={i} src={arsImg(k)} alt="" loading="lazy" className="h-56 w-72 rounded-xl object-cover" />)}
        </div>
        <p className="section mt-6 text-xs text-mist">Customer project photographs will be added once ARS supplies verified images.</p>
      </section>

      {/* 18 Why ARS */}
      <section className="section py-20 sm:py-32">
        <Reveal><p className="eyebrow">Why ARS?</p><h2 className={`${H2} mt-4`}>Why <span className="serif-accent">ARS?</span></h2></Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-3">
          {whyArs.map(([t, d], i) => <Reveal key={t} className="bg-ink p-8"><i className="font-display text-sm not-italic text-ember">0{i + 1}</i><h3 className="mt-6 text-xl font-semibold">{t}</h3><p className="mt-2 text-sm text-mist">{d}</p></Reveal>)}
        </div>
      </section>

      {/* 20 FAQs */}
      <section className="section py-12 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="eyebrow">FAQ</p><h2 className={`${H2} mt-4`}>Questions.</h2><Link to="/faqs" className="btn-ghost mt-8">All FAQs</Link></div>
          <Faq items={faqs.slice(0, 7)} />
        </div>
      </section>

      {/* 21 Final CTA + booking */}
      <section className="relative overflow-hidden border-t border-line py-24 sm:py-32">
        <img src={`/posters/${BRAND_INTRO}.jpg`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />
        <div className="section relative grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Contact / booking</p>
            <h2 className="headline mt-4 text-[clamp(2.25rem,6vw,5.5rem)]">Your car deserves more than a wash.</h2>
            <p className="mt-5 font-serif text-3xl italic text-gold">Experience the art of automotive detailing.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link to="/booking" className="btn-primary">Book your service</Link><Link to="/contact" className="btn-ghost">Contact ARS</Link></div>
          </div>
          <div className="card p-6 sm:p-8"><h3 className="mb-5 font-display text-2xl font-semibold">Request a service.</h3><QuickRequest /></div>
        </div>
      </section>
    </main>
  );
}
