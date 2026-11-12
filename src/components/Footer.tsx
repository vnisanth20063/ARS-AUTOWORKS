import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { Logo, footerGroups } from './Navbar';

export default function Footer() {
  const c = site.contact;
  return (
    <footer className="mt-24 border-t border-line bg-charcoal pb-24 pt-14 sm:pb-14">
      <div className="section grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo className="h-12" />
          <p className="mt-5 font-display text-xl font-bold uppercase tracking-tight">Restore. Protect. Maintain.</p>
          <p className="mt-3 max-w-sm text-sm text-mist">Precision in every detail. Care in every component. Excellence in every experience.</p>
        </div>
        {footerGroups.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <p className="eyebrow mb-3">{g.title}</p>
            <ul className="space-y-2 text-sm">{g.links.map((l) => <li key={l.to}><Link to={l.to} className="text-mist hover:text-white">{l.label}</Link></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="section mt-10 grid gap-6 border-t border-line pt-8 text-sm text-mist md:grid-cols-2">
        <div>
          <p className="mb-2 font-medium text-white">Contact</p>
          {c.phone || c.email || c.address ? (
            <ul className="space-y-1">{c.phone && <li>{c.phone}</li>}{c.email && <li>{c.email}</li>}{c.address && <li>{c.address}</li>}</ul>
          ) : (
            <p>Contact details to be confirmed by ARS. <Link to="/contact" className="text-ember underline">Contact page</Link></p>
          )}
          <p className="mt-2">Social links – to be added.</p>
        </div>
        <p className="text-xs md:text-right">© {new Date().getFullYear()} {site.name}. All rights reserved. Prices, availability and compatibility are confirmed by ARS. Booking, cart, inspection and dashboard features are frontend demonstrations.</p>
      </div>
    </footer>
  );
}
