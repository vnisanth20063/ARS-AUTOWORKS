import PageHero from '../components/PageHero';
import InspectionTool from '../components/InspectionTool';

export default function Inspection() {
  return (
    <main>
      <PageHero eyebrow="Signature · Related parts inspection" title="We don’t just repair" accent="the damaged part.">
        We inspect related components to identify wear and potential problems before they become expensive repairs.
      </PageHero>
      <div className="section py-14">
        <p className="demo-note mb-10 max-w-3xl">A predefined frontend demonstration. Connected components come from fixed rules, conditions are entered by you, and nothing is predicted, diagnosed or sent to ARS. ARS never replaces a related part automatically – replacement depends on inspection findings and your approval.</p>
        <InspectionTool />
      </div>
    </main>
  );
}
