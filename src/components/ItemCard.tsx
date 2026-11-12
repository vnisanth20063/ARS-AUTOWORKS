import { Link } from 'react-router-dom';
import { groupOf, type CatalogueItem } from '../data/catalogue';
import { servicePrices } from '../data/pricing';
import Price from './Price';
import AddToCartButton from './AddToCartButton';

interface Props { item: CatalogueItem; compare?: { on: boolean; toggle: () => void; disabled: boolean } }

export default function ItemCard({ item, compare }: Props) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-charcoal transition-colors hover:border-white/30">
      <Link to={`/services/${item.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-black" aria-label={`View details: ${item.title}`}>
        <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs text-mist">{groupOf(item.group).label}</span>
        {item.illustrative && <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[11px] text-gold">Illustrative image</span>}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
        <p className="line-clamp-3 text-sm text-mist">{item.short}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <Price value={servicePrices[item.slug]} className="text-sm" />
          <div className="flex flex-wrap gap-2">
            <Link to={`/services/${item.slug}`} className="btn-ghost !px-4 !py-2">Details</Link>
            <AddToCartButton id={item.slug} compact />
          </div>
        </div>
        {compare && (
          <label className="flex items-center gap-2 text-xs text-mist">
            <input type="checkbox" className="h-4 w-4 accent-[#e11d2e]" checked={compare.on} disabled={compare.disabled && !compare.on} onChange={compare.toggle} /> Compare
          </label>
        )}
      </div>
    </article>
  );
}
