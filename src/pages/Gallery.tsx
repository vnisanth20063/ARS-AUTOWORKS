import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { comparisons } from '../data/comparisons';
import { services, media } from '../data/services';
import PageHero from '../components/PageHero';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

type Cat = 'all' | 'exterior' | 'interior' | 'mechanical' | 'protection';
interface G { id: string; src: string; title: string; cat: Exclude<Cat, 'all'>; ref: boolean; video?: string; tall?: boolean }
const arsItems: [string, string, Exclude<Cat, 'all'>, boolean?][] = [
  ['foam', 'Foam wash', 'exterior', true], ['polish', 'Paint correction', 'exterior'], ['studio', 'Studio finish', 'exterior'], ['glass', 'Glass care', 'exterior'], ['wheel', 'Alloy wheel cleaning', 'exterior'],
  ['inter', 'Interior', 'interior', true], ['steam', 'Steam cleaning', 'interior', true], ['engine-bay', 'Engine bay cleaning', 'protection'], ['under', 'Underbody', 'protection'], ['susp', 'Suspension component', 'mechanical', true],
  ['egr', 'EGR component', 'mechanical'], ['inj', 'Injector component', 'mechanical'], ['valve', 'Valve component', 'mechanical', true], ['parts', 'Critical parts', 'protection'], ['rat-repellent', 'Rat repellent', 'protection'], ['rat-odour', 'Rat odour elimination', 'protection', true],
];
const refItems: [string, string, Exclude<Cat, 'all'>][] = [
  ['foam-wash', 'Foam wash', 'exterior'], ['interior-cleaning', 'Interior cleaning', 'interior'], ['paint-correction', 'Paint correction', 'exterior'], ['ceramic-coating', 'Ceramic coating', 'exterior'], ['ppf-installation', 'PPF installation', 'exterior'],
  ['interior-restoration', 'Interior restoration', 'interior'], ['engine-repair', 'Engine work', 'mechanical'], ['brake-repair', 'Brake work', 'mechanical'], ['suspension-repair', 'Suspension & underbody work', 'mechanical'], ['battery-service', 'Battery service', 'mechanical'], ['ac-service', 'AC service', 'mechanical'], ['tyre-service', 'Tyre service', 'mechanical'], ['completed-projects', 'Completed service demonstration', 'exterior'], ['workshop-process', 'Workshop process', 'mechanical'],
];
const all: G[] = [
  ...arsItems.map(([k, t, c, tall]) => ({ id: `a-${k}`, src: `/ars/${k}.jpg`, title: t, cat: c, ref: false, tall })),
  ...refItems.map(([k, t, c]) => ({ id: `r-${k}`, src: `/reference/${k}.jpg`, title: t, cat: c, ref: true })),
  ...services.map((s) => ({ id: `v-${s.slug}`, src: media(s.slug).poster, title: s.title, cat: (s.category === 'interior-cleaning' ? 'interior' : s.category === 'exclusive-treatments' ? 'protection' : 'exterior') as G['cat'], ref: false, video: media(s.slug).sd })),
];

export default function Gallery() {
  const [cat, setCat] = useState<Cat>('all');
  const [open, setOpen] = useState<number | null>(null);
  const list = useMemo(() => all.filter((g) => cat === 'all' || g.cat === cat), [cat]);
  const close = useCallback(() => setOpen(null), []);
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % list.length)); if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + list.length) % list.length)); };
    document.addEventListener('keydown', k); document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [open, list.length, close]);
  const cur = open !== null ? list[open] : null;
  const cats: [Cat, string][] = [['all', 'All'], ['exterior', 'Exterior'], ['interior', 'Interior'], ['mechanical', 'Mechanical'], ['protection', 'Protection & treatments']];

  return (
    <main>
      <PageHero eyebrow="Gallery" title="See the difference." accent="Feel the perfection.">ARS supplied imagery and service films, plus clearly labelled illustrative reference imagery. Customer project photographs will be added once ARS supplies verified images.</PageHero>
      <div className="section py-10">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery">{cats.map(([id, l]) => <button key={id} type="button" aria-pressed={cat === id} className={`chip ${cat === id ? 'chip-on' : ''}`} onClick={() => setCat(id)}>{l}</button>)}</div>
        <p className="mt-4 text-sm text-mist" aria-live="polite">{list.length} items · <span className="text-gold">Gold tag</span> = illustrative reference image, not an ARS job</p>
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {list.map((g, i) => (
            <button key={g.id} type="button" onClick={() => setOpen(i)} className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl border border-line text-left" aria-label={`Open ${g.title}`}>
              {g.video ? (
                <video src={g.video} poster={g.src} muted loop playsInline preload="none" className={`w-full object-cover ${g.id.length % 2 ? 'aspect-[4/5]' : 'aspect-video'}`} onMouseEnter={(e) => e.currentTarget.play().catch(() => undefined)} onMouseLeave={(e) => e.currentTarget.pause()} />
              ) : <img src={g.src} alt="" loading="lazy" className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${g.tall ? 'aspect-[4/5]' : ''}`} />}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 p-4 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">{g.title}{g.video ? ' · video preview' : ''}</span>
              {g.ref && <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[11px] text-gold">Illustrative</span>}
            </button>
          ))}
        </div>

        <h2 className="mt-20 text-2xl font-semibold">Before and after</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {comparisons.filter((c) => c.before && c.after).map((c) => (
            <figure key={c.id}><BeforeAfterSlider before={c.before} after={c.after} title={c.title} illustrative={c.illustrative} />
              <figcaption className="mt-3 flex items-center justify-between text-sm"><span>{c.title}</span><Link className="text-ember underline" to={`/services/${c.serviceSlug}`}>View service</Link></figcaption></figure>
          ))}
        </div>
      </div>

      {cur && (
        <div role="dialog" aria-modal="true" aria-label={cur.title} className="fixed inset-0 z-[90] flex flex-col bg-black/95 p-4" onClick={close}>
          <button type="button" onClick={close} className="ml-auto grid h-11 w-11 place-items-center rounded-full bg-white/10" aria-label="Close"><X size={22} aria-hidden /></button>
          <div className="relative m-auto flex max-h-full w-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {cur.video ? <video key={cur.id} src={cur.video} poster={cur.src} controls autoPlay muted playsInline className="max-h-[75vh] w-full rounded-xl" /> : <img src={cur.src} alt={cur.title} className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain" />}
            <p className="mt-4 text-center font-medium">{cur.title}</p>
            <p className="text-xs text-mist">{cur.ref ? 'Illustrative reference image – not an actual ARS job' : 'ARS supplied imagery'} · {(open ?? 0) + 1} / {list.length}</p>
            <div className="mt-3 flex gap-3"><button type="button" className="btn-ghost" onClick={() => setOpen((i) => ((i ?? 0) - 1 + list.length) % list.length)}>Previous</button><button type="button" className="btn-ghost" onClick={() => setOpen((i) => ((i ?? 0) + 1) % list.length)}>Next</button></div>
          </div>
        </div>
      )}
    </main>
  );
}
