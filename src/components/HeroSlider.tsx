import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { arsImg, arsVideo, heroSlides } from '../data/ars';
import { usePrefersReducedMotion } from '../hooks/useMedia';

/** Cinematic four-slide hero from the original ARS Premium page. */
export default function HeroSlider() {
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLElement>(null);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduced) return;
    const t = window.setTimeout(() => setI((n) => (n + 1) % heroSlides.length), heroSlides[i].duration);
    return () => window.clearTimeout(t);
  }, [i, visible, reduced]);

  useEffect(() => {
    vids.current.forEach((v, k) => {
      if (!v) return;
      if (k === i && visible && !reduced) { v.currentTime = 0; v.play().catch(() => undefined); } else v.pause();
    });
  }, [i, visible, reduced]);

  const s = heroSlides[i];
  return (
    <section ref={root} className="relative flex min-h-screen min-h-svh items-end overflow-hidden" aria-roledescription="carousel" aria-label="ARS hero">
      {heroSlides.map((h, k) => (
        <div key={h.label} className={`absolute inset-0 transition-opacity duration-[1400ms] ${k === i ? 'opacity-100' : 'opacity-0'}`} aria-hidden={k !== i}>
          <img src={arsImg(h.img)} alt="" className="h-full w-full object-cover" loading={k === 0 ? 'eager' : 'lazy'} />
          {h.video && !reduced && (
            <video ref={(el) => { vids.current[k] = el; }} className="absolute inset-0 h-full w-full object-cover" src={arsVideo(h.video).src} poster={arsVideo(h.video).poster} muted playsInline preload="none" loop />
          )}
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
      <div className="section relative pb-28 pt-32 sm:pb-24 sm:pt-40">
        <p className="eyebrow">0{i + 1} / 04 — {s.label}</p>
        <h1 className="headline mt-5 max-w-5xl text-[clamp(2.4rem,9vw,8rem)]">The Art of Automotive <span className="serif-accent text-[1.05em]">Detailing.</span></h1>
        <p className="mt-6 max-w-xl text-lg text-white/80">Precision detailing. Restoration. Protection. Every vehicle deserves more than a wash. It deserves precision.</p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link to="/booking" className="btn-primary">Book your service</Link>
          <a href="#method" className="btn-ghost">Explore our process</a>
        </div>
        <div className="mt-12 flex items-center gap-3" role="tablist" aria-label="Hero slides">
          {heroSlides.map((h, k) => (
            <button key={h.label} type="button" role="tab" aria-selected={k === i} aria-label={`Slide ${k + 1}: ${h.label}`} onClick={() => setI(k)} className="group flex h-11 flex-1 items-center sm:max-w-[120px]">
              <span className="relative block h-0.5 w-full bg-white/25">
                <span key={k === i ? `on-${i}` : `off-${k}`} className="absolute inset-y-0 left-0 bg-ember" style={k === i && !reduced ? { animation: `heroFill ${h.duration}ms linear forwards` } : { width: k < i || (k === i && reduced) ? '100%' : '0%' }} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
