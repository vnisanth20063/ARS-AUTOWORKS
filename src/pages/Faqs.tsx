import { useMemo, useState } from 'react';
import { faqs } from '../data/ars';
import Faq from '../components/Faq';
import PageHero from '../components/PageHero';

export default function Faqs() {
  const [q, setQ] = useState('');
  const list = useMemo(() => faqs.filter(([a, b]) => `${a} ${b}`.toLowerCase().includes(q.trim().toLowerCase())), [q]);
  return (
    <main>
      <PageHero eyebrow="FAQ" title="Questions." accent="Answered." />
      <div className="section max-w-3xl py-12">
        <label htmlFor="fq" className="sr-only">Search FAQs</label>
        <input id="fq" type="search" className="field mb-8" placeholder="Search questions" value={q} onChange={(e) => setQ(e.target.value)} />
        {list.length ? <Faq key={q} items={list} /> : <p className="text-mist">No questions match your search.</p>}
      </div>
    </main>
  );
}
