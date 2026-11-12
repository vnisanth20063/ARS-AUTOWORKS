// Tips, dashboard sample data and tier placeholders. Nothing here is a real ARS price, offer, review or customer record.
export const tips = [
  { id: 'wash-frequency', title: 'Washing: why the pre-wash matters', read: '2 min', body: 'A foam or rinse pre-wash lifts loose grit before anything touches the paint, which is how many fine swirl marks are avoided. Wash from the top down, rinse often and dry with clean microfibre.' },
  { id: 'interior-care', title: 'Keeping leather and plastics looking tidy', read: '2 min', body: 'Dust the cabin with a soft brush first, then wipe with a cleaner made for the material. Soft tools and gentle products protect grain and finish.' },
  { id: 'protection-types', title: 'Wax, sealant, graphene and ceramic: the idea behind each', read: '3 min', body: 'All four add a sacrificial layer above the paint. Wax favours gloss, sealants favour longer-lasting protection, and graphene and ceramic options aim for higher-performance protection. ARS confirms which suits your vehicle.' },
  { id: 'brake-signs', title: 'Early signs your brakes want attention', read: '2 min', body: 'Squealing, a soft pedal, pulling to one side or vibration under braking are all reasons to have the brakes inspected. This is general guidance, not a diagnosis.' },
  { id: 'battery-signs', title: 'Battery health: what slow cranking can mean', read: '2 min', body: 'Slow cranking, dim lights at idle or a warning light can point to the battery, the alternator or corroded terminals. A proper test separates them.' },
  { id: 'ac-care', title: 'Getting the most from your car’s AC', read: '2 min', body: 'Run the AC regularly, replace the cabin filter on schedule and keep the condenser fins clear. Weak cooling deserves an inspection rather than guesswork.' },
];
export const offers: { id: string; title: string; text: string }[] = []; // none published

export const tiers = [
  { id: 'basic', name: 'Basic', text: 'Essential care for a quick refresh.' },
  { id: 'premium', name: 'Premium', text: 'A fuller combination of services.' },
  { id: 'luxury', name: 'Luxury', text: 'The complete ARS treatment.' },
  { id: 'custom', name: 'Custom', text: 'Choose the services you need and ARS will quote them together.' },
];

export const sampleVehicles = [
  { id: 'v1', name: 'Sample sedan', detail: '2019 · Petrol · Registration not entered' },
  { id: 'v2', name: 'Sample SUV', detail: '2021 · Diesel · Registration not entered' },
];
export const sampleBookings = [
  { id: 'SAMPLE-001', title: 'Interior Refresh (sample)', date: 'Sample date', status: 'Sample – not a real booking' },
];
export const sampleHistory = [
  { id: 'h1', date: 'Sample', title: 'Foam, Wax, Degrease & Ceramic Wash', kind: 'service' },
  { id: 'h2', date: 'Sample', title: 'Steam Cleaning – Interior Panels', kind: 'service' },
  { id: 'h3', date: 'Sample', title: 'Brake pad replacement', kind: 'repair' },
  { id: 'h4', date: 'Sample', title: 'Battery replacement', kind: 'repair' },
];
