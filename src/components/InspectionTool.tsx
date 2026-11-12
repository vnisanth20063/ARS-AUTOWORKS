import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { conditionMeta, repairRules, type Condition } from '../data/inspection';
import { formatPrice } from '../utils/cart';

type Decision = 'approved' | 'rejected' | undefined;
const PLAN_KEY = 'ars-inspection-plan';
const SAVED_KEY = 'ars-saved-estimates';

/** Predefined, manual related-parts inspection demo. Nothing is predicted or sent anywhere. */
export default function InspectionTool({ compact = false, initial = 'clutch' }: { compact?: boolean; initial?: string }) {
  const [ruleId, setRuleId] = useState(initial);
  const rule = repairRules.find((r) => r.id === ruleId)!;
  const [cond, setCond] = useState<Record<string, Condition>>({});
  const [cost, setCost] = useState<Record<string, string>>({});
  const [dec, setDec] = useState<Record<string, Decision>>({});
  const [saved, setSaved] = useState('');
  useEffect(() => { setCond({}); setCost({}); setDec({}); setSaved(''); }, [ruleId]);

  const findings = useMemo(() => rule.related.map((r) => ({ r, c: cond[r.id] ?? ('good' as Condition) })), [rule, cond]);
  const attention = findings.filter((f) => f.c !== 'good');
  const approved = attention.filter((f) => f.c !== 'inspect' && dec[f.r.id] === 'approved');
  const entered = approved.map((f) => Number(cost[f.r.id])).filter((n) => Number.isFinite(n) && n > 0);
  const total = entered.reduce((a, b) => a + b, 0);

  const persist = (key: string) => {
    const plan = { repair: rule.repair, serviceSlug: rule.serviceSlug, at: new Date().toISOString(), items: attention.map((f) => ({ name: f.r.name, condition: conditionMeta[f.c].label, decision: f.c === 'inspect' ? 'ARS to inspect' : dec[f.r.id] ?? 'undecided', estimate: cost[f.r.id] || null })) };
    try {
      if (key === PLAN_KEY) localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
      else { const list = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]'); list.push(plan); localStorage.setItem(SAVED_KEY, JSON.stringify(list)); }
      setSaved(key === PLAN_KEY ? 'Inspection plan attached – continue to booking to include it.' : 'Estimate saved to your dashboard on this device.');
    } catch { setSaved('Could not save on this device.'); }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <div>
        <p className="eyebrow">1 · Select the repair</p>
        <div className="mt-4 flex flex-wrap gap-2 lg:flex-col" role="group" aria-label="Repair type">
          {repairRules.map((r) => (
            <button key={r.id} type="button" aria-pressed={r.id === ruleId} onClick={() => setRuleId(r.id)} className={`chip text-left lg:w-full ${r.id === ruleId ? 'chip-on' : ''}`}>{r.repair}</button>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-line bg-charcoal p-5">
          <p className="text-xs uppercase tracking-widest text-mist">Primary component</p>
          <p className="mt-1 font-display text-xl font-semibold">{rule.primary}</p>
          <p className="mt-3 text-xs text-mist">Connected components below come from a predefined list. This demonstration does not diagnose a vehicle.</p>
        </div>
      </div>

      <div>
        <p className="eyebrow">2 · Record the condition of each related component</p>
        <ul className="mt-4 space-y-4">
          {findings.map(({ r, c }) => (
            <li key={r.id} className="rounded-2xl border border-line bg-charcoal p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="max-w-md">
                  <h3 className="text-lg font-semibold">{r.name}</h3>
                  <p className="mt-1 text-sm text-mist"><span className="text-white/80">Why check it: </span>{r.why}</p>
                  {!compact && <p className="mt-1 text-xs text-mist">Checklist: {r.check}</p>}
                </div>
                <div>
                  <label htmlFor={`c-${r.id}`} className="sr-only">Condition of {r.name}</label>
                  <select id={`c-${r.id}`} className="field !min-h-[40px] !py-2" value={c} onChange={(e) => { setCond((p) => ({ ...p, [r.id]: e.target.value as Condition })); setDec((p) => ({ ...p, [r.id]: undefined })); }}>
                    {(Object.keys(conditionMeta) as Condition[]).map((k) => <option key={k} value={k}>{conditionMeta[k].label}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(Object.keys(conditionMeta) as Condition[]).map((k) => (
                  <span key={k} className={`rounded-full border px-3 py-1 text-xs ${k === c ? conditionMeta[k].tone : 'border-line text-mist/60'}`}>{conditionMeta[k].label}</span>
                ))}
              </div>
              {c !== 'good' && (
                <div className="mt-4 rounded-xl bg-graphite p-4 text-sm">
                  <p className="font-medium">Recommended action</p>
                  <p className="mt-1 text-mist">{r.action[c]}</p>
                  {(c === 'worn' || c === 'damaged') && (
                    <div className="mt-4 flex flex-wrap items-end gap-3">
                      <div>
                        <label htmlFor={`e-${r.id}`} className="mb-1 block text-xs text-mist">ARS estimate (₹) – enter only if ARS has quoted</label>
                        <input id={`e-${r.id}`} inputMode="numeric" className="field !min-h-[40px] !w-40 !py-2" value={cost[r.id] ?? ''} onChange={(e) => setCost((p) => ({ ...p, [r.id]: e.target.value.replace(/[^\d]/g, '') }))} placeholder="Not quoted" />
                      </div>
                      <button type="button" aria-pressed={dec[r.id] === 'approved'} onClick={() => setDec((p) => ({ ...p, [r.id]: 'approved' }))} className={`btn !py-2 ${dec[r.id] === 'approved' ? 'bg-emerald-500 text-white' : 'border border-line hover:border-emerald-400'}`}><Check size={16} aria-hidden /> Approve</button>
                      <button type="button" aria-pressed={dec[r.id] === 'rejected'} onClick={() => setDec((p) => ({ ...p, [r.id]: 'rejected' }))} className={`btn !py-2 ${dec[r.id] === 'rejected' ? 'bg-ember text-white' : 'border border-line hover:border-ember'}`}><X size={16} aria-hidden /> Reject</button>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-2xl border border-line bg-charcoal p-6" aria-live="polite">
          <p className="eyebrow">3 · Inspection findings</p>
          {attention.length === 0 ? <p className="mt-3 text-mist">All related components are marked Good. No additional work is suggested.</p> : (
            <ul className="mt-3 space-y-2 text-sm">
              {attention.map(({ r, c }) => (
                <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-2 last:border-0">
                  <span>{r.name} <span className={`ml-2 rounded-full border px-2 py-0.5 text-xs ${conditionMeta[c].tone}`}>{conditionMeta[c].label}</span></span>
                  <span className="text-mist">{c === 'inspect' ? 'ARS to inspect' : dec[r.id] === 'approved' ? 'Approved by you' : dec[r.id] === 'rejected' ? 'Rejected by you' : 'Awaiting your decision'}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-sm">Additional estimated cost (from figures you entered): <span className="font-semibold">{entered.length ? formatPrice(total) : 'Request a quote'}</span></p>
          <p className="mt-1 text-xs text-mist">ARS never replaces a related part automatically. Replacement depends on inspection findings and your approval.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" className="btn-primary" onClick={() => persist(PLAN_KEY)}>Attach to booking request</button>
            <button type="button" className="btn-ghost" onClick={() => persist(SAVED_KEY)}>Save estimate</button>
            <Link to={`/services/${rule.serviceSlug}`} className="btn-quiet">View {rule.repair}</Link>
          </div>
          {saved && <p className="mt-3 text-sm text-gold">{saved} {saved.startsWith('Inspection') && <Link to="/booking" className="underline">Open booking</Link>}</p>}
        </div>
      </div>
    </div>
  );
}
