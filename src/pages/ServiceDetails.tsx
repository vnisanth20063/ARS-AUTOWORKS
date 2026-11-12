import { Link, useNavigate, useParams } from 'react-router-dom';
import { categoryOf, services } from '../data/services';
import { catalogue, groupOf, itemBySlug } from '../data/catalogue';
import { repairRules } from '../data/inspection';
import { servicePrices } from '../data/pricing';
import { comparisons } from '../data/comparisons';
import { useCart } from '../context/CartContext';
import SmartVideo from '../components/SmartVideo';
import Price from '../components/Price';
import AddToCartButton from '../components/AddToCartButton';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ItemCard from '../components/ItemCard';

export default function ServiceDetails() {
  const { slug } = useParams();
  const nav = useNavigate();
  const { add } = useCart();
  const item = itemBySlug(slug);
  if (!item) return <main className="section pt-40 text-center"><h1 className="headline text-4xl">Service not found</h1><Link to="/services" className="btn-primary mt-8">Browse services</Link></main>;
  const o = item.original;
  const g = groupOf(item.group);
  const real = comparisons.filter((c) => c.serviceSlug === item.slug && c.before && c.after);
  const related = catalogue.filter((x) => x.group === item.group && x.slug !== item.slug).slice(0, 3);
  const rule = repairRules.find((r) => r.serviceSlug === item.slug);
  return (
    <main className="pb-10 pt-24">
      <div className="section">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-mist"><Link to="/services" className="hover:text-white">Services</Link> / <Link to={`/services?group=${item.group}`} className="hover:text-white">{g.label}</Link>{o && <> / {categoryOf(o.category).label}</>}</nav>
        <div className="overflow-hidden rounded-2xl border border-line bg-black">
          {o ? <SmartVideo key={o.slug} slug={o.slug} className="aspect-video w-full object-cover" /> : (
            <div className="relative"><img src={item.image} alt="" className="aspect-video w-full object-cover" />{item.illustrative && <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-xs text-gold">Illustrative image – not an actual ARS job</span>}</div>
          )}
        </div>
        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[1fr_340px] lg:gap-12">
          <div>
            <h1 className="headline text-[clamp(2rem,5vw,4rem)]">{item.title}</h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80">{o ? o.description : item.short}</p>
            {o ? (<>
              <h2 className="mt-12 text-xl font-semibold">Benefits</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-white/80">{o.benefits.map((b) => <li key={b}>{b}</li>)}</ul>
              <h2 className="mt-12 text-xl font-semibold">Process</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-white/80">{o.process.map((p) => <li key={p}>{p}</li>)}</ol>
              <p className="mt-3 text-xs text-mist">Steps are indicative. ARS confirms the exact process for your vehicle.</p>
            </>) : (
              <div className="mt-8 rounded-2xl border border-dashed border-line p-6"><p className="font-semibold">Details to be confirmed by ARS</p><p className="mt-2 text-sm text-mist">Scope, process, duration, price and availability for this service are confirmed by ARS after you send a request. Nothing here is a warranty or a fixed price.</p></div>
            )}
            {rule && (
              <div className="card mt-10 p-6"><p className="eyebrow">Related parts inspection</p><p className="mt-2 text-white/80">For {rule.repair.toLowerCase()}, ARS suggests inspecting: {rule.related.map((r) => r.name.toLowerCase()).join(', ')}.</p><Link to="/related-parts-inspection" className="btn-ghost mt-4">Open inspection tool</Link></div>
            )}
            <h2 className="mt-12 text-xl font-semibold">Suitable vehicles</h2>
            <p className="mt-2 text-white/80">Suitability is confirmed by ARS when you book.</p>
          </div>
          <aside className="order-first h-fit rounded-2xl border border-line bg-charcoal p-6 lg:order-none lg:sticky lg:top-24">
            <p className="text-sm text-mist">Price</p>
            <Price value={servicePrices[item.slug]} className="text-2xl" />
            <div className="mt-6 flex flex-col gap-3">
              <AddToCartButton id={item.slug} />
              <button type="button" className="btn-ghost" onClick={() => { add('service', item.slug); nav('/booking'); }}>Book this service</button>
            </div>
            <p className="mt-4 text-xs text-mist">Final pricing and availability are confirmed by ARS.</p>
          </aside>
        </div>

        <h2 className="mt-16 text-xl font-semibold">Before and after</h2>
        {real.length ? (
          <div className="mt-4 grid gap-6 md:grid-cols-2">{real.map((c) => <BeforeAfterSlider key={c.id} before={c.before} after={c.after} title={c.title} illustrative={c.illustrative} />)}</div>
        ) : <p className="mt-2 text-mist">Before-and-after images for this service will be added once ARS supplies them.</p>}

        <h2 className="mt-16 text-xl font-semibold">Related services</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((x) => <ItemCard key={x.slug} item={x} />)}</div>
        {!o && <p className="mt-10 text-xs text-mist">Total original detailing services with full process detail: {services.length}.</p>}
      </div>
    </main>
  );
}
