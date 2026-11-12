import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sampleBookings, sampleHistory, sampleVehicles } from '../data/content';
import { healthSystems } from '../data/health';
import { conditionMeta } from '../data/inspection';
import PageHero from '../components/PageHero';

const tabs = [['vehicles', 'My Vehicles'], ['bookings', 'My Bookings'], ['history', 'Service History'], ['repairs', 'Repair History'], ['health', 'Vehicle Health Reports'], ['recs', 'Service Recommendations'], ['estimates', 'Saved Estimates'], ['profile', 'Profile']] as const;
type Tab = typeof tabs[number][0];
const read = <T,>(k: string, d: T): T => { try { return JSON.parse(localStorage.getItem(k) || 'null') ?? d; } catch { return d; } };
interface Req { kind: string; reference: string; submittedAt: string; services?: { id: string }[] }
interface Plan { repair: string; at: string; items: { name: string; condition: string; decision: string; estimate: string | null }[] }

export default function Dashboard() {
  const { pathname } = useLocation();
  const [tab, setTab] = useState<Tab>(pathname === '/service-history' ? 'history' : 'vehicles');
  const [reqs, setReqs] = useState<Req[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [vehicles, setVehicles] = useState(sampleVehicles);
  const [nv, setNv] = useState('');
  const [profile, setProfile] = useState({ name: '', mobile: '', email: '' });
  const [saved, setSaved] = useState(false);
  useEffect(() => { setReqs(read('ars-requests', [])); setPlans(read('ars-saved-estimates', [])); setProfile(read('ars-profile', { name: '', mobile: '', email: '' })); setVehicles(read('ars-vehicles', sampleVehicles)); }, []);
  useEffect(() => { if (pathname === '/service-history') setTab('history'); }, [pathname]);

  const addVehicle = () => { if (!nv.trim()) return; const next = [...vehicles, { id: `v${Date.now()}`, name: nv.trim(), detail: 'Added by you on this device' }]; setVehicles(next); setNv(''); try { localStorage.setItem('ars-vehicles', JSON.stringify(next)); } catch { /* ignore */ } };
  const removeVehicle = (id: string) => { const next = vehicles.filter((v) => v.id !== id); setVehicles(next); try { localStorage.setItem('ars-vehicles', JSON.stringify(next)); } catch { /* ignore */ } };
  const saveProfile = () => { try { localStorage.setItem('ars-profile', JSON.stringify(profile)); setSaved(true); setTimeout(() => setSaved(false), 2000); } catch { /* ignore */ } };
  const attention = healthSystems.filter((s) => s.status !== 'good');
  const bookingReqs = reqs.filter((r) => r.kind.startsWith('booking') || r.kind === 'quick-request');

  return (
    <main>
      <PageHero eyebrow="Customer dashboard" title="Your ARS" accent="dashboard.">A frontend demonstration. There is no login: sample data is shown, and anything you save stays on this device.</PageHero>
      <div className="section grid gap-8 py-12 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Dashboard" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
          {tabs.map(([id, l]) => <button key={id} type="button" aria-current={tab === id ? 'page' : undefined} onClick={() => setTab(id)} className={`chip shrink-0 text-left lg:w-full ${tab === id ? 'chip-on' : ''}`}>{l}</button>)}
        </nav>
        <section aria-live="polite">
          <p className="demo-note mb-6">Sample data is labelled “Sample”. Nothing here is a real ARS customer record or confirmed booking.</p>
          {tab === 'vehicles' && (<div><h2 className="font-display text-2xl font-semibold">My Vehicles</h2>
            <ul className="mt-5 space-y-3">{vehicles.map((v) => <li key={v.id} className="card flex items-center justify-between p-4"><div><p className="font-medium">{v.name}</p><p className="text-sm text-mist">{v.detail}</p></div><button type="button" className="btn-quiet" onClick={() => removeVehicle(v.id)} aria-label={`Remove ${v.name}`}>Remove</button></li>)}</ul>
            <div className="mt-5 flex max-w-md gap-2"><label htmlFor="nv" className="sr-only">Vehicle name</label><input id="nv" className="field" placeholder="Add a vehicle (e.g. Honda City 2020)" value={nv} onChange={(e) => setNv(e.target.value)} /><button type="button" className="btn-primary" onClick={addVehicle}>Add</button></div></div>)}
          {tab === 'bookings' && (<div><h2 className="font-display text-2xl font-semibold">My Bookings</h2>
            <ul className="mt-5 space-y-3">
              {bookingReqs.map((r) => <li key={r.reference} className="card p-4"><p className="font-medium">Request {r.reference}</p><p className="text-sm text-mist">{new Date(r.submittedAt).toLocaleString()} · saved on this device · not confirmed by ARS</p></li>)}
              {sampleBookings.map((b) => <li key={b.id} className="card p-4"><p className="font-medium">{b.title}</p><p className="text-sm text-mist">{b.date} · {b.status}</p></li>)}
            </ul><Link to="/booking" className="btn-primary mt-6">New booking request</Link></div>)}
          {(tab === 'history' || tab === 'repairs') && (<div><h2 className="font-display text-2xl font-semibold">{tab === 'history' ? 'Service History' : 'Repair History'}</h2>
            <ul className="mt-5 space-y-3">{sampleHistory.filter((h) => tab === 'history' ? h.kind === 'service' : h.kind === 'repair').map((h) => <li key={h.id} className="card flex items-center justify-between p-4"><span>{h.title}</span><span className="text-sm text-gold">Sample · {h.date}</span></li>)}</ul></div>)}
          {tab === 'health' && (<div><h2 className="font-display text-2xl font-semibold">Vehicle Health Reports</h2>
            <div className="card mt-5 p-5"><p className="font-medium">Sample inspection report</p><div className="mt-3 flex flex-wrap gap-2">{healthSystems.map((s) => <span key={s.id} className={`rounded-full border px-3 py-1 text-xs ${conditionMeta[s.status].tone}`}>{s.name}: {conditionMeta[s.status].label}</span>)}</div><Link to="/vehicle-health-report" className="btn-ghost mt-5">Open report</Link></div></div>)}
          {tab === 'recs' && (<div><h2 className="font-display text-2xl font-semibold">Service Recommendations</h2>
            <ul className="mt-5 space-y-3">{attention.map((s) => <li key={s.id} className="card p-4"><p className="font-medium">{s.name} <span className={`ml-2 rounded-full border px-2 py-0.5 text-xs ${conditionMeta[s.status].tone}`}>{conditionMeta[s.status].label}</span></p><p className="mt-1 text-sm text-mist">{s.preventive}</p></li>)}</ul><p className="mt-4 text-xs text-mist">Based on the sample report. Recommendations need your approval and ARS confirmation.</p></div>)}
          {tab === 'estimates' && (<div><h2 className="font-display text-2xl font-semibold">Saved Estimates</h2>
            {plans.length === 0 ? <div className="mt-5 rounded-2xl border border-dashed border-line p-8"><p className="text-mist">No saved estimates yet. Save one from the inspection tool.</p><Link to="/related-parts-inspection" className="btn-ghost mt-4">Related parts inspection</Link></div> : (
              <ul className="mt-5 space-y-3">{plans.map((p, i) => <li key={i} className="card p-4"><p className="font-medium">{p.repair}</p><p className="text-xs text-mist">{new Date(p.at).toLocaleString()}</p><ul className="mt-2 text-sm text-mist">{p.items.map((it) => <li key={it.name}>• {it.name} – {it.condition} ({it.decision}){it.estimate ? ` · ₹${it.estimate}` : ''}</li>)}</ul></li>)}</ul>)}</div>)}
          {tab === 'profile' && (<div className="max-w-md"><h2 className="font-display text-2xl font-semibold">Profile</h2>
            <div className="mt-5 space-y-4">{(['name', 'mobile', 'email'] as const).map((k) => <div key={k}><label htmlFor={`p-${k}`} className="label capitalize">{k}</label><input id={`p-${k}`} className="field" type={k === 'email' ? 'email' : 'text'} value={profile[k]} onChange={(e) => setProfile({ ...profile, [k]: e.target.value })} /></div>)}</div>
            <button type="button" className="btn-primary mt-6" onClick={saveProfile}>Save profile</button>{saved && <span className="ml-3 text-sm text-gold">Saved on this device</span>}</div>)}
        </section>
      </div>
    </main>
  );
}
