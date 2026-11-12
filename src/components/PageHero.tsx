import type { ReactNode } from 'react';

export default function PageHero({ eyebrow, title, accent, children, image }: { eyebrow: string; title: string; accent?: string; children?: ReactNode; image?: string }) {
  return (
    <header className="relative overflow-hidden border-b border-line pb-14 pt-32 sm:pb-20 sm:pt-40">
      {image && <><img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" /></>}
      <div className="section relative">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="headline mt-4 max-w-5xl text-[clamp(2.25rem,7vw,5.5rem)]">{title}{accent && <> <span className="serif-accent text-[1.05em]">{accent}</span></>}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg text-white/75">{children}</div>}
      </div>
    </header>
  );
}
