import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, ShoppingCart, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { groups } from '../data/catalogue';

const platform = [
  { to: '/related-parts-inspection', label: 'Related Parts Inspection' },
  { to: '/vehicle-health-report', label: 'Vehicle Health Report' },
  { to: '/dashboard', label: 'Customer Dashboard' },
  { to: '/service-history', label: 'Service History' },
];
const specialist = [
  { to: '/paint-correction', label: 'Paint Correction' },
  { to: '/ceramic-graphene', label: 'Ceramic & Graphene Protection' },
  { to: '/ppf', label: 'PPF Services' },
  { to: '/replacement-services', label: 'OEM / OEM+ Replacement' },
];
const more = [
  { to: '/about', label: 'About ARS' },
  { to: '/blog', label: 'Offers & Blog' },
  { to: '/faqs', label: 'FAQs' },
  { to: '/contact', label: 'Contact' },
];
export const footerGroups = [
  { title: 'Services', links: [{ to: '/services', label: 'All Services' }, ...groups.filter((g) => !g.route.includes('#')).map((g) => ({ to: g.route, label: g.label })), ...specialist] },
  { title: 'Platform', links: [...platform, { to: '/packages', label: 'Service Packages' }, { to: '/gallery', label: 'Gallery' }] },
  { title: 'ARS', links: [...more, { to: '/booking', label: 'Booking' }, { to: '/cart', label: 'Service Cart' }] },
];

export function Logo({ className = 'h-9' }: { className?: string }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="ARS Premium home">
      <img src="/brand/ars-logo-white.png" alt="ARS" className={`${className} w-auto`} width={120} height={55} />
      <span className="hidden text-[10px] font-semibold uppercase tracking-[0.3em] text-mist sm:inline">The Automotive Atelier</span>
    </Link>
  );
}

type Menu = { id: string; label: string; sections: { title?: string; links: { to: string; label: string }[] }[] };
const menus: Menu[] = [
  { id: 'services', label: 'Services', sections: [
    { title: 'Catalogue', links: [{ to: '/services', label: 'All Services' }, ...groups.filter((g) => !g.route.includes('#')).map((g) => ({ to: g.route, label: g.label }))] },
    { title: 'Specialist', links: specialist },
  ] },
  { id: 'platform', label: 'Inspect & Track', sections: [{ links: platform }] },
];

function Dropdown({ m }: { m: Menu }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', away); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', away); document.removeEventListener('keydown', esc); };
  }, [open]);
  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" className="flex items-center gap-1 text-sm text-white/80 hover:text-white" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)}>
        {m.label}<ChevronDown size={14} aria-hidden className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4">
          <div className={`grid gap-8 rounded-2xl border border-line bg-charcoal p-6 shadow-2xl ${m.sections.length > 1 ? 'w-[520px] grid-cols-2' : 'w-64'}`}>
            {m.sections.map((s, i) => (
              <div key={i}>
                {s.title && <p className="eyebrow mb-3">{s.title}</p>}
                <ul className="space-y-1">{s.links.map((l) => <li key={l.to}><Link to={l.to} className="block rounded-md px-2 py-1.5 text-sm text-white/80 hover:bg-white/5 hover:text-white">{l.label}</Link></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const { pathname } = useLocation();
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); menuBtn.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  const link = ({ isActive }: { isActive: boolean }) => `text-sm transition-colors ${isActive ? 'text-ember' : 'text-white/80 hover:text-white'}`;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/95 sm:bg-ink/80 sm:backdrop-blur-md" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div className="section flex h-16 items-center justify-between gap-6">
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-7 xl:flex">
            <NavLink to="/" end className={link}>Home</NavLink>
            {menus.map((m) => <Dropdown key={m.id} m={m} />)}
            <NavLink to="/packages" className={link}>Packages</NavLink>
            <NavLink to="/gallery" className={link}>Gallery</NavLink>
            <Dropdown m={{ id: 'more', label: 'More', sections: [{ links: more }] }} />
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/cart" className="relative grid h-11 w-11 place-items-center rounded-full hover:bg-white/10" aria-label={`Cart, ${items.length} item${items.length === 1 ? '' : 's'}`}>
              <ShoppingCart size={20} aria-hidden />
              {items.length > 0 && <span className="absolute right-0.5 top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-ember px-1 text-[11px] font-bold text-white">{items.length}</span>}
            </Link>
            <Link to="/booking" className="btn-primary hidden !py-2 sm:inline-flex">Book now</Link>
            <button ref={menuBtn} type="button" className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10 xl:hidden" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
              <Menu size={22} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink p-5 xl:hidden" style={{ paddingTop: 'calc(1.25rem + env(safe-area-inset-top, 0px))', paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}>
          <div className="flex items-center justify-between">
            <Logo />
            <button ref={closeRef} type="button" className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10" aria-label="Close menu" onClick={() => { setOpen(false); menuBtn.current?.focus(); }}>
              <X size={22} aria-hidden />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-6 flex-1">
            <NavLink to="/" end className={({ isActive }) => `block border-b border-line py-3 font-display text-xl font-semibold ${isActive ? 'text-ember' : ''}`}>Home</NavLink>
            {footerGroups.map((g) => (
              <div key={g.title} className="border-b border-line py-4">
                <p className="eyebrow mb-2">{g.title}</p>
                <ul className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">{g.links.map((l) => <li key={l.to}><NavLink to={l.to} className={({ isActive }) => `block py-2 text-base ${isActive ? 'text-ember' : 'text-white/85'}`}>{l.label}</NavLink></li>)}</ul>
              </div>
            ))}
          </nav>
          <Link to="/booking" className="btn-primary mt-6 w-full">Book your service</Link>
        </div>
      )}
    </>
  );
}
