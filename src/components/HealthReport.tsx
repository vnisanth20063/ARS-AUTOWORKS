import { useMemo, useState } from 'react';
import { conditionMeta, type Condition } from '../data/inspection';
import { healthSystems, sampleVehicle } from '../data/health';

const score: Record<Condition, number> = { good: 100, inspect: 70, worn: 40, damaged: 10 };

export default function HealthReport() {
  const [status, setStatus] = useState<Record<string, Condition>>(() => Object.fromEntries(healthSystems.map((s) => [s.id, s.status])));
  const [open, setOpen] = useState<string>('brakes');
  const avg = useMemo(() => Math.round(healthSystems.reduce((a, s) => a + score[status[s.id]], 0) / healthSystems.length), [status]);
  const overall: Condition = healthSystems.some((s) => status[s.id] === 'damaged') ? 'damaged' : avg >= 90 ? 'good' : avg >= 70 ? 'inspect' : 'worn';
  const needing = healthSystems.filter((s) => status[s.id] !== 'good');
  const R = 54, C = 2 * Math.PI * R;

  return (
    <div>
      <p className="demo-note">Sample report with demo data. Statuses are entered manually – this is not real vehicle diagnostics. Change any status to see the report update.</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[340px_1fr]">
        <div className="card p-6 text-center">
          <p className="text-xs uppercase tracking-widest text-mist">{sampleVehicle.name}</p>
          <p className="text-xs text-mist">{sampleVehicle.detail}</p>
          <svg viewBox="0 0 140 140" className="mx-auto mt-6 h-44 w-44" role="img" aria-label={`Overall condition ${conditionMeta[overall].label}, score ${avg} out of 100`}>
            <circle cx="70" cy="70" r={R} fill="none" stroke="#2a2e36" strokeWidth="10" />
            <circle cx="70" cy="70" r={R} fill="none" stroke="#e11d2e" strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C - (C * avg) / 100} transform="rotate(-90 70 70)" style={{ transition: 'stroke-dashoffset .6s' }} />
            <text x="70" y="68" textAnchor="middle" className="fill-white font-display" fontSize="30" fontWeight="700">{avg}</text>
            <text x="70" y="86" textAnchor="middle" className="fill-[#9aa0aa]" fontSize="9">OVERALL / 100</text>
          </svg>
          <span className={`mt-4 inline-block rounded-full border px-4 py-1 text-sm ${conditionMeta[overall].tone}`}>Overall: {conditionMeta[overall].label}</span>
          <div className="mt-6 border-t border-line pt-4 text-left">
            <p className="eyebrow mb-2">Parts requiring inspection</p>
            {needing.length === 0 ? <p className="text-sm text-mist">None.</p> : (
              <ul className="space-y-1 text-sm text-mist">{needing.flatMap((s) => s.parts.map((p) => <li key={s.id + p}>• {p} <span className="text-xs">({s.name})</span></li>))}</ul>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {healthSystems.map((s) => {
            const c = status[s.id];
            return (
              <article key={s.id} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div><h3 className="text-lg font-semibold">{s.name}</h3><p className="mt-1 text-xs text-mist">{s.note}</p></div>
                  <span className={`h-3 w-3 shrink-0 rounded-full ${conditionMeta[c].dot}`} aria-hidden />
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line"><div className={`h-full ${conditionMeta[c].dot}`} style={{ width: `${score[c]}%`, transition: 'width .5s' }} /></div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <label htmlFor={`h-${s.id}`} className="sr-only">{s.name} status</label>
                  <select id={`h-${s.id}`} value={c} onChange={(e) => setStatus((p) => ({ ...p, [s.id]: e.target.value as Condition }))} className="field !min-h-[38px] !w-auto !py-1.5">
                    {(Object.keys(conditionMeta) as Condition[]).map((k) => <option key={k} value={k}>{conditionMeta[k].label}</option>)}
                  </select>
                  <button type="button" className="text-sm text-ember underline" aria-expanded={open === s.id} onClick={() => setOpen(open === s.id ? '' : s.id)}>{open === s.id ? 'Hide' : 'Details'}</button>
                </div>
                {open === s.id && (
                  <dl className="mt-4 space-y-3 border-t border-line pt-4 text-sm">
                    <div><dt className="text-xs uppercase tracking-widest text-mist">Recommended maintenance</dt><dd className="mt-1">{s.maintenance}</dd></div>
                    <div><dt className="text-xs uppercase tracking-widest text-mist">Preventive suggestion</dt><dd className="mt-1">{c === 'good' ? 'No action recommended.' : s.preventive}</dd></div>
                    <div><dt className="text-xs uppercase tracking-widest text-mist">Components</dt><dd className="mt-1 text-mist">{s.parts.join(' · ')}</dd></div>
                  </dl>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
