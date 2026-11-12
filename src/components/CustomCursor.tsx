import { useEffect, useRef } from 'react';
import { useMediaQuery, usePrefersReducedMotion } from '../hooks/useMedia';

/** Premium cursor ring on fine-pointer desktops only. */
export default function CustomCursor() {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!fine || reduced) return;
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      const t = e.target as HTMLElement | null;
      ref.current?.classList.toggle('big', !!t?.closest('a,button,[role="button"],[role="slider"],summary,select,input,textarea'));
    };
    const loop = () => { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; if (ref.current) ref.current.style.transform = `translate3d(${cx}px,${cy}px,0)`; raf = requestAnimationFrame(loop); };
    window.addEventListener('mousemove', move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, [fine, reduced]);
  if (!fine || reduced) return null;
  return <div ref={ref} className="cursor-ring" aria-hidden />;
}
