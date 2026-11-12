import { services, type Service } from './services';

export type GroupId = 'exterior' | 'interior' | 'mechanical' | 'electrical' | 'ac' | 'tyre' | 'protection';
export interface Group { id: GroupId; letter: string; label: string; blurb: string; route: string; image: string; illustrative?: boolean }

export const groups: Group[] = [
  { id: 'exterior', letter: 'A', label: 'Exterior Detailing', blurb: 'Washes, decontamination, correction and protection for paint, glass and wheels.', route: '/detailing', image: '/ars/foam.jpg' },
  { id: 'interior', letter: 'B', label: 'Interior Restoration', blurb: 'Germ clean, steam, extraction and care for fabric, leather and plastics.', route: '/interior-restoration', image: '/ars/inter.jpg' },
  { id: 'mechanical', letter: 'C', label: 'Mechanical Services', blurb: 'Engine, drivetrain, brakes, suspension, cooling and underbody work.', route: '/mechanical', image: '/reference/engine-repair.jpg', illustrative: true },
  { id: 'electrical', letter: 'D', label: 'Electrical Services', blurb: 'Battery, charging, starting, wiring, sensors and lighting.', route: '/electrical', image: '/reference/battery-service.jpg', illustrative: true },
  { id: 'ac', letter: 'E', label: 'Air Conditioning', blurb: 'Inspection, servicing, gas refill and cooling performance testing.', route: '/ac-services', image: '/reference/ac-service.jpg', illustrative: true },
  { id: 'tyre', letter: 'F', label: 'Tyre & Wheel Services', blurb: 'Tyres, alignment, balancing, puncture repair and rim inspection.', route: '/mechanical#tyre', image: '/reference/tyre-service.jpg', illustrative: true },
  { id: 'protection', letter: 'G', label: 'Protection & Special Treatments', blurb: 'Rat protection, engine bay, underchassis, silencer, OEM / OEM+ and critical parts.', route: '/replacement-services', image: '/ars/under.jpg' },
];
export const groupOf = (id: GroupId) => groups.find((g) => g.id === id)!;

export interface CatalogueItem {
  slug: string; title: string; group: GroupId; short: string;
  image: string; illustrative?: boolean; original?: Service; tags?: string[];
}

// The 15 original services keep every description, benefit and process step; they are only grouped here.
const originalGroup: Record<string, GroupId> = {
  'foam-wax-degrease-ceramic-wash': 'exterior', 'clay-bar-descaling-wash': 'exterior', 'alloy-wheel-deep-cleaning': 'exterior', 'paint-protection-coatings': 'exterior',
  'germ-clean-interior-panels': 'interior', 'steam-interior-panels': 'interior', 'dirt-extraction-fabric-seats-floors': 'interior', 'leather-and-plastic-care': 'interior',
  'engine-bay-deep-cleaning': 'protection', 'rat-repellent-treatment': 'protection', 'rat-entry-odour-eliminate': 'protection', 'plastic-and-rubber-care': 'interior',
  'underchassis-protection-coating': 'protection', 'silencer-protection-coating': 'protection', 'critical-parts-cleaning': 'protection',
};
const originals: CatalogueItem[] = services.map((s) => ({
  slug: s.slug, title: s.title, group: originalGroup[s.slug], short: s.short, image: `/posters/${s.slug}.jpg`, original: s,
}));

type T = [string, string, string, string?, boolean?]; // slug, title, short, image, illustrative
const mk = (group: GroupId, rows: T[]): CatalogueItem[] =>
  rows.map(([slug, title, short, image, illustrative]) => ({
    slug, title, group, short, image: image ?? groupOf(group).image, illustrative: image ? !!illustrative : !!groupOf(group).illustrative,
  }));
const R = (n: string) => `/reference/${n}.jpg`;
const A = (n: string) => `/ars/${n}.jpg`;
const q = 'Request-a-quote service. Availability and scope are subject to ARS confirmation.';

export const newItems: CatalogueItem[] = [
  ...mk('exterior', [
    ['glass-hard-water-mark-removal', 'Glass Cleaning – Hard-Water Mark Removal & Sealant', 'Remove mineral deposits and restore clarity before sealing.', A('glass')],
    ['paint-correction', 'Paint Correction', 'From imperfection to reflection. Scratch, swirl and fade correction, followed by protection.', A('polish')],
    ['scratch-removal', 'Scratch Removal', 'Assessment and correction of light scratches in the paint. ' + q, R('paint-correction'), true],
    ['polishing', 'Polishing', 'Machine polishing to restore gloss and clarity. ' + q, R('paint-correction'), true],
    ['wax-protection', 'Wax Protection', 'Gloss and surface enhancement.', A('foam')],
    ['sealant-protection', 'Sealant Protection', 'Longer-lasting surface protection.', A('studio')],
    ['graphene-protection', 'Graphene Protection', 'Advanced protective performance.', R('ceramic-coating'), true],
    ['ceramic-protection', 'Ceramic Protection', 'High-performance surface protection.', R('ceramic-coating'), true],
    ['paint-protection-film', 'Paint Protection Film (PPF)', 'Protective film fitted to vulnerable paint areas. ' + q, R('ppf-installation'), true],
    ['exterior-trim-restoration', 'Exterior Trim Restoration', 'Restoring faded exterior plastics and rubber trim. ' + q, A('wheel')],
  ]),
  ...mk('interior', [
    ['carpet-cleaning', 'Carpet Cleaning', 'Deep cleaning of cabin carpets and floor mats. ' + q, R('interior-cleaning'), true],
    ['leather-restoration', 'Leather Restoration', 'Restoring the finish and feel of leather seats. ' + q, R('interior-restoration'), true],
    ['plastic-restoration', 'Plastic Restoration', 'Restoration of finish and feel for cabin plastics.', A('inter')],
    ['dashboard-cleaning', 'Dashboard Cleaning', 'Careful cleaning of dashboard, vents and controls. ' + q, R('interior-cleaning'), true],
    ['interior-sanitisation', 'Interior Sanitisation', 'Sanitising treatment for touch surfaces. ' + q, R('interior-cleaning'), true],
    ['odour-elimination', 'Odour Elimination', 'Removing the source of unpleasant cabin odours. ' + q, A('steam')],
  ]),
  ...mk('mechanical', [
    ['engine-repair', 'Engine Repair', 'Engine diagnosis and repair. ' + q, R('engine-repair'), true],
    ['clutch-repair', 'Clutch Repair', 'Clutch inspection and repair. ' + q],
    ['transmission-repair', 'Transmission Repair', 'Transmission inspection and repair. ' + q],
    ['brake-repair', 'Brake Repair', 'Brake inspection and repair. ' + q, R('brake-repair'), true],
    ['suspension-repair', 'Suspension Repair', 'Suspension inspection and repair. ' + q, R('suspension-repair'), true],
    ['steering-repair', 'Steering Repair', 'Steering inspection and repair. ' + q],
    ['radiator-repair', 'Radiator Repair', 'Radiator inspection and repair. ' + q],
    ['cooling-system-maintenance', 'Cooling System Maintenance', 'Coolant, hoses and cooling system checks. ' + q],
    ['exhaust-repair', 'Exhaust Repair', 'Exhaust inspection and repair. ' + q],
    ['fuel-system-maintenance', 'Fuel System Maintenance', 'Fuel system inspection and maintenance. ' + q],
    ['underbody-inspection', 'Underbody Inspection', 'Visual inspection of underbody components. ' + q, A('under')],
  ]),
  ...mk('electrical', [
    ['battery-testing-replacement', 'Battery Testing & Replacement', 'Battery health testing and replacement. ' + q, R('battery-service'), true],
    ['alternator-repair', 'Alternator Repair', 'Charging system inspection and repair. ' + q],
    ['starter-motor-repair', 'Starter Motor Repair', 'Starter motor inspection and repair. ' + q],
    ['wiring-inspection', 'Wiring Inspection', 'Inspection of wiring and connectors. ' + q],
    ['ecu-inspection', 'ECU Inspection', 'Inspection of engine control electronics. ' + q],
    ['sensor-replacement', 'Sensor Replacement', 'Replacement of faulty sensors. ' + q],
    ['lighting-repairs', 'Lighting Repairs', 'Repair of headlamps, tail lamps and indicators. ' + q],
    ['power-window-repairs', 'Power Window Repairs', 'Power window motor and switch repair. ' + q],
  ]),
  ...mk('ac', [
    ['ac-inspection', 'AC Inspection', 'Inspection of the air-conditioning system. ' + q, R('ac-service'), true],
    ['ac-servicing', 'AC Servicing', 'Routine air-conditioning service. ' + q],
    ['ac-gas-refill', 'AC Gas Refill', 'Refrigerant refill after system check. ' + q],
    ['compressor-repair', 'Compressor Repair', 'AC compressor inspection and repair. ' + q],
    ['condenser-inspection', 'Condenser Inspection', 'Condenser inspection for damage and blockage. ' + q],
    ['cooling-performance-testing', 'Cooling Performance Testing', 'Measuring how well the cabin cools. ' + q],
  ]),
  ...mk('tyre', [
    ['tyre-replacement', 'Tyre Replacement', 'Fitting of replacement tyres. ' + q, R('tyre-service'), true],
    ['wheel-alignment', 'Wheel Alignment', 'Alignment check and adjustment. ' + q],
    ['wheel-balancing', 'Wheel Balancing', 'Balancing of wheel and tyre assemblies. ' + q],
    ['puncture-repair', 'Puncture Repair', 'Repair of repairable punctures. ' + q],
    ['tyre-rotation', 'Tyre Rotation', 'Rotating tyres to even out wear. ' + q],
    ['rim-inspection', 'Rim Inspection', 'Inspection of rims for damage. ' + q],
  ]),
  ...mk('protection', [
    ['oem-replacement', 'OEM Replacement', 'Original-equipment standard. Availability depends on vehicle condition, model and component.', A('parts')],
    ['oem-plus-replacement', 'OEM+ Replacement', 'Enhanced or upgraded replacement solutions where appropriate.', A('susp')],
    ['critical-parts-inspection', 'Critical Parts Inspection', 'Inspection of critical components before cleaning, restoration or replacement.', A('egr')],
    ['critical-parts-restoration', 'Critical Parts Restoration', 'Professional restoration of critical vehicle components, where applicable.', A('inj')],
  ]),
];

// Stand-in for the slugs the original React data used for same-named services.
export const catalogue: CatalogueItem[] = [...originals, ...newItems];
export const itemBySlug = (slug?: string) => catalogue.find((c) => c.slug === slug);
export const itemsIn = (g: GroupId) => catalogue.filter((c) => c.group === g);
export const titleOfSlug = (slug: string) => itemBySlug(slug)?.title ?? slug;
