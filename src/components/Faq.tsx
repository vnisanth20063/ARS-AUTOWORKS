import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function Faq({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map(([q, a], i) => (
        <div key={q}>
          <h3>
            <button type="button" className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-semibold" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? null : i)}>
              {q}<Plus size={20} aria-hidden className={`shrink-0 text-ember transition-transform ${open === i ? 'rotate-45' : ''}`} />
            </button>
          </h3>
          <div id={`faq-${i}`} role="region" hidden={open !== i} className="pb-6 pr-10 text-mist">{a}</div>
        </div>
      ))}
    </div>
  );
}
