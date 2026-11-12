import { useState } from 'react';
import { Link } from 'react-router-dom';
import { offers, tips } from '../data/content';
import PageHero from '../components/PageHero';

export default function Blog() {
  const [tab, setTab] = useState<'tips' | 'offers'>('tips');
  const [open, setOpen] = useState<string | null>(null);
  return (
    <main>
      <PageHero eyebrow="Offers & blog" title="Maintenance" accent="tips.">General guidance on caring for your vehicle. These are not diagnoses or ARS service promises.</PageHero>
      <div className="section py-12">
        <div className="flex gap-2" role="tablist"><button role="tab" aria-selected={tab === 'tips'} className={`chip ${tab === 'tips' ? 'chip-on' : ''}`} onClick={() => setTab('tips')}>Maintenance tips</button><button role="tab" aria-selected={tab === 'offers'} className={`chip ${tab === 'offers' ? 'chip-on' : ''}`} onClick={() => setTab('offers')}>Offers</button></div>
        {tab === 'tips' ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {tips.map((t) => (
              <article key={t.id} className="card p-6">
                <p className="text-xs text-mist">{t.read} read</p><h2 className="mt-2 font-display text-xl font-semibold">{t.title}</h2>
                {open === t.id && <p className="mt-3 text-white/80">{t.body}</p>}
                <button type="button" className="mt-4 text-sm text-ember underline" aria-expanded={open === t.id} onClick={() => setOpen(open === t.id ? null : t.id)}>{open === t.id ? 'Show less' : 'Read tip'}</button>
              </article>
            ))}
          </div>
        ) : offers.length ? null : (
          <div className="mt-8 rounded-2xl border border-dashed border-line p-10"><p className="text-lg font-semibold">No offers published</p><p className="mt-2 max-w-lg text-mist">ARS has not approved any offers yet. Choose services and request a quote instead.</p><Link to="/services" className="btn-primary mt-6">Choose services</Link></div>
        )}
      </div>
    </main>
  );
}
