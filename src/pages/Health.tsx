import PageHero from '../components/PageHero';
import HealthReport from '../components/HealthReport';

export default function Health() {
  return (
    <main>
      <PageHero eyebrow="Digital vehicle health report" title="Your vehicle," accent="read clearly.">Overall condition, system-by-system indicators, parts requiring inspection, recommended maintenance and preventive suggestions.</PageHero>
      <div className="section py-14"><HealthReport /></div>
    </main>
  );
}
