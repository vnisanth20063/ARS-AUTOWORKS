import { Link } from 'react-router-dom';
import { groupOf, itemsIn, itemBySlug, type GroupId } from '../data/catalogue';
import { paintProtectionTiers } from '../data/ars';
import { comparisons } from '../data/comparisons';
import ItemCard from '../components/ItemCard';
import PageHero from '../components/PageHero';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import Reveal from '../components/Reveal';

function Grid({ slugs, group }: { slugs?: string[]; group?: GroupId }) {
  const list = slugs ? slugs.map((s) => itemBySlug(s)!).filter(Boolean) : itemsIn(group!);
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((i) => <ItemCard key={i.slug} item={i} />)}</div>;
}
const Note = ({ children }: { children: string }) => <p className="demo-note mt-6 max-w-3xl">{children}</p>;
const quoteNote = 'These services are request-a-quote. Availability, scope and price are subject to ARS confirmation. Images marked illustrative are reference imagery, not ARS jobs.';

export function Detailing() {
  const g = groupOf('exterior');
  return (
    <main><PageHero eyebrow="Exterior detailing" title="Detailing." accent="Done properly." image="/ars/foam.jpg">{g.blurb} Fresh water wash is the foundation of proper vehicle care.</PageHero>
      <div className="section py-14"><Grid group="exterior" /><Note>{quoteNote}</Note>
        <div className="mt-14 flex flex-wrap gap-3"><Link to="/paint-correction" className="btn-ghost">Paint correction</Link><Link to="/ceramic-graphene" className="btn-ghost">Ceramic & graphene</Link><Link to="/ppf" className="btn-ghost">PPF</Link></div></div></main>
  );
}
export function InteriorRestoration() {
  return (
    <main><PageHero eyebrow="Interior restoration" title="Inside matters" accent="just as much." image="/ars/inter.jpg">Germ clean, steam, dirt extraction and leather & plastic care – with original ARS video demonstrations on each service page.</PageHero>
      <div className="section py-14"><Grid group="interior" /><Note>{quoteNote}</Note></div></main>
  );
}
export function Mechanical() {
  return (
    <main><PageHero eyebrow="Mechanical services" title="Mechanical." accent="Inspected first." image="/reference/engine-repair.jpg">Engine, drivetrain, brakes, suspension, steering, cooling, exhaust, fuel and underbody work. ARS also inspects related components before they become expensive repairs.</PageHero>
      <div className="section py-14"><Grid group="mechanical" /><Note>{quoteNote}</Note>
        <div className="card mt-14 flex flex-wrap items-center justify-between gap-4 p-6"><div><p className="eyebrow">Signature</p><p className="mt-1 text-lg font-semibold">See which related parts ARS checks for your repair.</p></div><Link to="/related-parts-inspection" className="btn-primary">Related parts inspection</Link></div>
        <h2 id="tyre" className="headline mt-20 text-3xl sm:text-4xl">Tyre & wheel services</h2><div className="mt-8"><Grid group="tyre" /></div></div></main>
  );
}
export function Electrical() {
  return (
    <main><PageHero eyebrow="Electrical services" title="Electrical." accent="Properly tested." image="/reference/battery-service.jpg">Battery, charging, starting, wiring, ECU, sensors, lighting and power windows.</PageHero>
      <div className="section py-14"><Grid group="electrical" /><Note>{quoteNote}</Note></div></main>
  );
}
export function AcServices() {
  return (
    <main><PageHero eyebrow="Air conditioning" title="Air conditioning." accent="Cool, properly." image="/reference/ac-service.jpg">Inspection, servicing, gas refill, compressor repair, condenser inspection and cooling performance testing.</PageHero>
      <div className="section py-14"><Grid group="ac" /><Note>{quoteNote}</Note></div></main>
  );
}
export function PaintCorrection() {
  const c = comparisons.find((x) => x.id === 'paint-correction')!;
  return (
    <main><PageHero eyebrow="Paint correction" title="From imperfection" accent="to reflection." image="/ars/polish.jpg">Scratch, swirl and fade correction, followed by protection.</PageHero>
      <div className="section grid gap-12 py-16 lg:grid-cols-2 lg:items-center">
        <Reveal><BeforeAfterSlider before={c.before} after={c.after} title={c.title} illustrative /></Reveal>
        <div><p className="text-white/75"><span className="text-mist">Before —</span> Scratches · Swirls · Oxidation · Fading</p><p className="mt-2 text-white/75"><span className="text-mist">After —</span> Gloss · Depth · Clarity · Reflection</p><p className="mt-4 text-sm text-mist">Drag the slider. Sample image supplied for layout — swap for ARS’s own before/after work.</p></div>
      </div>
      <div className="section pb-14"><Grid slugs={['paint-correction', 'scratch-removal', 'polishing', 'clay-bar-descaling-wash']} /></div></main>
  );
}
export function CeramicGraphene() {
  return (
    <main><PageHero eyebrow="Paint protection" title="Protect the" accent="finish." image="/reference/ceramic-coating.jpg">Wax, sealant, graphene and ceramic protection. Professional services performed by ARS — not products for sale.</PageHero>
      <div className="section py-14">
        <div className="grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-4">{paintProtectionTiers.map((t, i) => <Link key={t.id} to={`/services/${t.id}-protection`} className="group bg-ink p-7 hover:bg-graphite"><p className="font-display text-sm text-line group-hover:text-ember">0{i + 1}</p><h2 className="mt-10 font-display text-3xl font-bold">{t.name}</h2><p className="mt-2 text-sm text-mist">{t.text}</p></Link>)}</div>
        <div className="mt-14"><Grid slugs={['paint-protection-coatings', 'wax-protection', 'sealant-protection', 'graphene-protection', 'ceramic-protection', 'paint-protection-film']} /></div></div></main>
  );
}
export function Ppf() {
  return (
    <main><PageHero eyebrow="PPF services" title="Paint protection" accent="film." image="/reference/ppf-installation.jpg">Protective film fitted to vulnerable paint areas. Request a quote – availability and scope are confirmed by ARS.</PageHero>
      <div className="section grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
        <div className="relative overflow-hidden rounded-2xl border border-line"><img src="/reference/ppf-installation.jpg" alt="PPF installation reference" className="w-full object-cover" /><span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-xs text-gold">Illustrative image – not an actual ARS job</span></div>
        <div><h2 className="headline text-3xl">How to request</h2><ol className="mt-5 list-decimal space-y-2 pl-5 text-white/80"><li>Add Paint Protection Film to your cart.</li><li>Tell ARS your vehicle in the booking request.</li><li>ARS confirms coverage options, price and timing.</li></ol><div className="mt-8 flex gap-3"><Link to="/services/paint-protection-film" className="btn-primary">View PPF service</Link><Link to="/booking" className="btn-ghost">Request a quote</Link></div></div>
      </div></main>
  );
}
