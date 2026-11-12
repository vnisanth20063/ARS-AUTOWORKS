import { Link, useSearchParams } from 'react-router-dom';
import { packages } from '../data/packages';
import { tiers } from '../data/content';
import PackageCard from '../components/PackageCard';
import PageHero from '../components/PageHero';

export default function Packages() {
  const [params] = useSearchParams();
  const drafts = params.get('preview') === 'drafts';
  const list = packages.filter((p) => p.approved || drafts);
  return (
    <main>
      <PageHero eyebrow="Service packages" title="Packages." accent="Combined care.">Approved service combinations from ARS. Package names and prices are set by ARS – none are published yet.</PageHero>
      <div className="section py-14">
        {list.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PackageCard key={p.id} pkg={p} />)}</div> : (
          <div className="rounded-2xl border border-dashed border-line p-10"><p className="text-lg font-semibold">No packages published yet</p><p className="mt-2 max-w-lg text-mist">Choose individual services and ARS will quote them together. Draft packages can be previewed at <code>/packages?preview=drafts</code>.</p><Link to="/services" className="btn-primary mt-6">Choose services</Link></div>
        )}
        <h2 className="headline mt-20 text-3xl sm:text-4xl">Package tiers</h2>
        <p className="mt-3 max-w-xl text-mist">The interface for future tiers. No prices or contents have been set.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t) => (
            <div key={t.id} className="flex flex-col rounded-2xl border border-dashed border-line p-6"><p className="eyebrow">Not yet available</p><h3 className="mt-3 font-display text-3xl font-bold">{t.name}</h3><p className="mt-2 text-sm text-mist">{t.text}</p><p className="mt-5 text-mist">Request a quote</p>
              <Link to={t.id === 'custom' ? '/services' : '/booking'} className="btn-ghost mt-auto !mt-6">{t.id === 'custom' ? 'Build a custom selection' : 'Ask ARS'}</Link></div>
          ))}
        </div>
      </div>
    </main>
  );
}
