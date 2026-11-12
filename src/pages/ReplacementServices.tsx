import ReplacementForm from '../components/ReplacementForm';

export default function ReplacementServices() {
  return (
    <main className="section pb-10 pt-32">
      <p className="eyebrow">OEM / OEM+</p>
      <h1 className="headline mt-3 max-w-4xl text-[clamp(2rem,6vw,5rem)]">Precision replacements. Quality you can trust.</h1>
      <p className="mt-6 max-w-2xl text-lg text-mist">ARS provides vehicle component replacement services using OEM and OEM+ quality options, subject to vehicle compatibility and availability. You are requesting a replacement service, not buying standalone spare parts.</p>
      <p className="mt-3 text-lg text-white">When replacement is required, we keep the standard high.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-charcoal p-6"><h2 className="text-xl font-semibold">OEM replacement service</h2><p className="mt-2 text-sm text-mist">Original-equipment quality options, matched to your vehicle where available.</p></div>
        <div className="rounded-2xl border border-line bg-charcoal p-6"><h2 className="text-xl font-semibold">OEM+ replacement service</h2><p className="mt-2 text-sm text-mist">Enhanced-quality options where ARS can offer them. Not every OEM+ option is available for every vehicle.</p></div>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">{['egr','inj','valve','parts','susp'].map((k) => <img key={k} src={`/ars/${k}.jpg`} alt="Automotive component" loading="lazy" className="aspect-square w-full rounded-xl object-cover" />)}</div>
      <section className="mt-14 max-w-3xl" aria-labelledby="enq">
        <h2 id="enq" className="text-2xl font-semibold">Request a replacement service</h2>
        <p className="mb-6 mt-2 text-sm text-mist">Replacements are quoted by ARS. Compatibility is confirmed before any work is booked.</p>
        <ReplacementForm />
      </section>
    </main>
  );
}
