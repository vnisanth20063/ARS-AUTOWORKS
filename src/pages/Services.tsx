import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { catalogue, groupOf, groups, type GroupId } from '../data/catalogue';
import { servicePrices } from '../data/pricing';
import { formatPrice } from '../utils/cart';
import ItemCard from '../components/ItemCard';
import PageHero from '../components/PageHero';

export default function Services() {
  const [params, setParams] = useSearchParams();
  const initial = (params.get('group') as GroupId | null) ?? 'all';
  const [cat, setCat] = useState<GroupId | 'all'>(groups.some((g) => g.id === initial) ? initial : 'all');
  const [q, setQ] = useState('');
  const [cmp, setCmp] = useState<string[]>([]);
  const list = useMemo(() => catalogue.filter((s) => (cat === 'all' || s.group === cat) && `${s.title} ${s.short}`.toLowerCase().includes(q.trim().toLowerCase())), [cat, q]);
  const chosen = cmp.map((slug) => catalogue.find((c) => c.slug === slug)!).filter(Boolean);
  const pick = (g: GroupId | 'all') => { setCat(g); setParams(g === 'all' ? {} : { group: g }); };
  const toggle = (slug: string) => setCmp((p) => (p.includes(slug) ? p.filter((x) => x !== slug) : p.length < 3 ? [...p, slug] : p));

  return (
    <main>
      <PageHero eyebrow="Catalogue" title="All services." accent="Every discipline.">
        Original ARS detailing services with full process detail, plus mechanical, electrical, AC, tyre and protection services available on request. Services without a listed price are quoted by ARS.
      </PageHero>
      <div className="section py-10">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <button type="button" className={`chip ${cat === 'all' ? 'chip-on' : ''}`} aria-pressed={cat === 'all'} onClick={() => pick('all')}>All</button>
          {groups.map((c) => <button key={c.id} type="button" className={`chip ${cat === c.id ? 'chip-on' : ''}`} aria-pressed={cat === c.id} onClick={() => pick(c.id)}>{c.label}</button>)}
        </div>
        <div className="mt-4 max-w-md">
          <label htmlFor="search" className="sr-only">Search services</label>
          <input id="search" type="search" className="field" placeholder="Search services" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <p className="mt-6 text-sm text-mist" aria-live="polite">{list.length} service{list.length === 1 ? '' : 's'}{cmp.length ? ` · ${cmp.length}/3 selected to compare` : ''}</p>
        {list.length ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => <ItemCard key={s.slug} item={s} compare={{ on: cmp.includes(s.slug), toggle: () => toggle(s.slug), disabled: cmp.length >= 3 }} />)}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-line p-10 text-center">
            <p className="font-semibold">No services match your search</p>
            <button type="button" className="btn-ghost mt-4" onClick={() => { setQ(''); pick('all'); }}>Clear filters</button>
          </div>
        )}

        {chosen.length >= 2 && (
          <section className="mt-16" aria-labelledby="cmp">
            <div className="flex items-center justify-between"><h2 id="cmp" className="font-display text-2xl font-semibold">Service comparison</h2><button type="button" className="btn-quiet" onClick={() => setCmp([])}>Clear</button></div>
            <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead><tr><th className="w-36 border-b border-line py-3 text-mist"> </th>{chosen.map((c) => <th key={c.slug} className="border-b border-line p-3 font-semibold">{c.title}</th>)}</tr></thead>
              <tbody>
                {[
                  ['Category', (c: typeof chosen[number]) => groupOf(c.group).label],
                  ['Summary', (c: typeof chosen[number]) => c.short],
                  ['Benefits listed', (c: typeof chosen[number]) => (c.original ? `${c.original.benefits.length}: ${c.original.benefits.join('; ')}` : 'Confirmed by ARS')],
                  ['Process steps', (c: typeof chosen[number]) => (c.original ? c.original.process.join(' → ') : 'Confirmed by ARS')],
                  ['Price', (c: typeof chosen[number]) => formatPrice(servicePrices[c.slug])],
                ].map(([label, fn]) => (
                  <tr key={label as string}><th scope="row" className="border-b border-line py-3 pr-3 align-top font-medium text-mist">{label as string}</th>{chosen.map((c) => <td key={c.slug} className="border-b border-line p-3 align-top">{(fn as (c: typeof chosen[number]) => string)(c)}</td>)}</tr>
                ))}
              </tbody>
            </table></div>
          </section>
        )}
      </div>
    </main>
  );
}
