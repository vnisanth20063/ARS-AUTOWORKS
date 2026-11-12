import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { methodSteps, standard, whyArs } from '../data/ars';
import PageHero from '../components/PageHero';

export default function About() {
  return (
    <main>
      <PageHero eyebrow="About ARS" title={site.tagline} image="/ars/studio.jpg">{site.supporting} At ARS Automotive Care, every vehicle receives attention, precision and care. From detailed cleaning to advanced surface protection and quality replacement services, we bring out the best in every vehicle.</PageHero>
      <div className="section py-16">
        <p className="eyebrow">The ARS Standard</p>
        <h2 className="headline mt-3 max-w-3xl text-3xl sm:text-5xl">{standard.title}</h2>
        <p className="mt-6 max-w-2xl text-lg text-white/75">{standard.body} {standard.emphasis}</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[['Precision', 'Detail work with the right tools for each surface.'], ['Care', 'Each vehicle is treated as a masterpiece, not a number.'], ['Trust', 'Prices, availability and compatibility are confirmed with you before work begins.']].map(([t, d]) => (
            <div key={t} className="card p-6"><h2 className="text-xl font-semibold">{t}</h2><p className="mt-2 text-sm text-mist">{d}</p></div>
          ))}
        </div>
        <h2 className="headline mt-20 text-3xl">Why ARS?</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{whyArs.map(([t, d]) => <div key={t} className="rounded-2xl border border-line p-6"><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm text-mist">{d}</p></div>)}</div>
        <h2 className="headline mt-20 text-3xl">The ARS Method</h2>
        <ol className="mt-8 flex flex-wrap gap-2">{methodSteps.map((m, i) => <li key={m} className="rounded-full border border-line px-4 py-2 text-sm"><span className="mr-2 text-ember">0{i + 1}</span>{m}</li>)}</ol>
        <Link to="/services" className="btn-primary mt-14">Explore our services</Link>
      </div>
    </main>
  );
}
