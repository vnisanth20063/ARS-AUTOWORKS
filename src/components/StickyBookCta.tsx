import { Link, useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { site } from '../data/site';

/** Mobile bottom bar plus a desktop floating pill. Hidden where it would be redundant. */
export default function StickyBookCta() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/booking') || pathname.startsWith('/cart')) return null;
  const wa = site.contact.whatsapp ? `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}` : null;
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-white/10 bg-ink/90 p-3 backdrop-blur-md sm:hidden" style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}>
        <Link to="/booking" className="btn-primary flex-1">Book your service</Link>
        {wa && <a href={wa} className="btn-ghost" aria-label="WhatsApp ARS"><MessageCircle size={18} aria-hidden /></a>}
      </div>
      <div className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 sm:flex">
        {wa && <a href={wa} className="btn-ghost bg-ink/80 backdrop-blur" aria-label="WhatsApp ARS"><MessageCircle size={18} aria-hidden /> WhatsApp</a>}
        <Link to="/booking" className="btn-primary shadow-lg shadow-ember/30">Book your service</Link>
      </div>
    </>
  );
}
