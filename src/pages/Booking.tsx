import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import BookingWizard from '../components/BookingWizard';
import { useCart } from '../context/CartContext';
import { itemBySlug } from '../data/catalogue';
import PageHero from '../components/PageHero';

export default function Booking() {
  const [params] = useSearchParams();
  const { add } = useCart();
  const [mode, setMode] = useState<'guided' | 'quick'>('guided');
  const preselect = params.get('service');
  useEffect(() => { if (preselect && itemBySlug(preselect)) add('service', preselect); }, [preselect, add]);
  return (
    <main>
      <PageHero eyebrow="Booking" title="Booking" accent="request.">Tell us about your vehicle and preferred time. ARS will contact you to confirm availability and pricing – a request is not a confirmed appointment.</PageHero>
      <div className="section max-w-4xl py-12">
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Booking mode">
          <button type="button" aria-pressed={mode === 'guided'} className={`chip ${mode === 'guided' ? 'chip-on' : ''}`} onClick={() => setMode('guided')}>Guided booking</button>
          <button type="button" aria-pressed={mode === 'quick'} className={`chip ${mode === 'quick' ? 'chip-on' : ''}`} onClick={() => setMode('quick')}>Quick request</button>
        </div>
        {mode === 'guided' ? <BookingWizard /> : <BookingForm />}
      </div>
    </main>
  );
}
