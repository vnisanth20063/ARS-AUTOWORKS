// Content carried over from the original ARS Premium page (wording preserved).
export const arsImg = (k: string) => `/ars/${k}.jpg`;
export const arsVideo = (k: string) => ({ src: `/ars/video/${k}.mp4`, poster: `/ars/video/${k}.jpg` });

export const heroSlides = [
  { label: 'Detailing', img: 'studio', video: undefined as string | undefined, duration: 5500 },
  { label: 'Restoration', img: 'steam', video: 'steam-clean', duration: 6500 },
  { label: 'Protection', img: 'under', video: undefined, duration: 5500 },
  { label: 'Precision care', img: 'polish', video: 'plastic-care', duration: 9500 },
];

export const standard = {
  title: 'Restore the detail. Preserve the machine.',
  body: 'ARS combines professional detailing techniques, restoration processes and advanced protection systems to bring vehicles back to their best condition.',
  emphasis: 'We don’t simply clean vehicles. We inspect, correct, restore, protect and preserve them.',
};

export const paintProtectionTiers = [
  { id: 'wax', name: 'Wax', text: 'Gloss and surface enhancement.' },
  { id: 'sealant', name: 'Sealant', text: 'Longer-lasting surface protection.' },
  { id: 'graphene', name: 'Graphene', text: 'Advanced protective performance.' },
  { id: 'ceramic', name: 'Ceramic', text: 'High-performance surface protection.' },
];

export const criticalPartsSteps = ['Inspect', 'Clean', 'Restore', 'Replace when required', 'Protect'];
export const criticalPartsImages = ['egr', 'inj', 'valve', 'parts', 'susp'];

export const methodSteps = ['Inspect', 'Diagnose', 'Prepare', 'Detail', 'Correct', 'Protect', 'Final inspection', 'Deliver'];

export const durationCopy = {
  lead: 'Time heals everything.',
  sub: 'But great detailing takes time.',
  body: 'Kindly give us the required time to serve your vehicle. Professional detailing is not rushed. Every process is performed carefully for the best possible outcome.',
};

export const whyArs = [
  ['Detail-first approach', 'Every process begins with inspection and preparation.'],
  ['Professional process', 'Structured procedures rather than rushed cleaning.'],
  ['OEM / OEM+ support', 'Replacement solutions when restoration is not enough.'],
  ['Advanced protection', 'Wax, sealant, graphene and ceramic protection.'],
  ['Critical part care', 'Detailed cleaning and protection of important vehicle areas.'],
  ['Final inspection', 'Every vehicle receives a final quality check.'],
];

export const faqs: [string, string][] = [
  ['How long does detailing take?', 'It depends on the vehicle and the treatment. Professional detailing is not rushed; ARS will advise a timeframe after inspection.'],
  ['Can I book a specific treatment?', 'Yes — choose any treatment in the booking form.'],
  ['Do you perform paint correction?', 'Yes. Scratch, swirl and fade correction, followed by protection.'],
  ['Do you remove hard-water marks from glass?', 'Yes, with a sealant applied afterwards.'],
  ['Do you provide engine-bay cleaning?', 'Yes — deep cleaning and protection.'],
  ['Do you provide interior steam cleaning?', 'Yes, for full interior panels.'],
  ['Do you provide ceramic coating?', 'Yes, as a professional ARS service.'],
  ['Do you provide graphene protection?', 'Yes, as a professional ARS service.'],
  ['Do you handle rat-repellent treatment?', 'Yes — preventive protection, plus odour elimination where rats have entered.'],
  ['Do you provide OEM replacement support?', 'Where suitable, yes. Availability depends on vehicle and component.'],
  ['What is OEM+ replacement?', 'Enhanced or upgraded replacement solutions where appropriate.'],
  ['How long should I leave my vehicle with ARS?', 'ARS will confirm the time needed after inspecting your vehicle.'],
  ['Do all vehicles require the same process?', 'No. Every vehicle is inspected and treated according to its condition.'],
  ['Is the booking, cart or dashboard on this site live?', 'Not yet. These are frontend demonstrations: requests are stored on your device only until ARS connects a form endpoint. No appointment is confirmed by using them.'],
  ['Are the mechanical, electrical, AC and tyre services confirmed?', 'These categories are listed so you can request a quote. Availability and scope for each service are subject to ARS confirmation.'],
];

export const bookingServiceOptions = [
  'Fresh Water Wash', 'Interior Cleaning', 'Exclusive Treatment', 'Paint Correction', 'Paint Protection', 'Ceramic Coating',
  'Graphene Protection', 'Engine Bay Detailing', 'Rat Treatment', 'Underchassis Protection', 'Silencer Protection', 'OEM / OEM+ Replacement Support', 'Other',
];
