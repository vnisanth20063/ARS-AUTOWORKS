// Predefined rules for the Related Parts Inspection demonstration. Not AI, not diagnostics.
export type Condition = 'good' | 'inspect' | 'worn' | 'damaged';
export const conditionMeta: Record<Condition, { label: string; tone: string; dot: string }> = {
  good: { label: 'Good', tone: 'text-emerald-300 border-emerald-400/40 bg-emerald-400/10', dot: 'bg-emerald-400' },
  inspect: { label: 'Needs Inspection', tone: 'text-amber-300 border-amber-400/40 bg-amber-400/10', dot: 'bg-amber-400' },
  worn: { label: 'Worn', tone: 'text-orange-300 border-orange-400/40 bg-orange-400/10', dot: 'bg-orange-400' },
  damaged: { label: 'Damaged', tone: 'text-red-300 border-red-400/40 bg-red-400/10', dot: 'bg-red-500' },
};
export interface Related { id: string; name: string; why: string; check: string; action: Record<Exclude<Condition, 'good'>, string> }
export interface RepairRule { id: string; repair: string; primary: string; serviceSlug: string; related: Related[] }

const act = (inspect: string, worn: string, damaged: string) => ({ inspect, worn, damaged });
export const repairRules: RepairRule[] = [
  { id: 'clutch', repair: 'Clutch repair', primary: 'Clutch assembly', serviceSlug: 'clutch-repair', related: [
    { id: 'flywheel', name: 'Flywheel', why: 'The clutch disc presses against the flywheel; a worn or scored surface shortens the life of a new clutch.', check: 'Surface scoring, heat marks, run-out', action: act('ARS to inspect the flywheel surface while the gearbox is out.', 'Consider resurfacing or replacing the flywheel – only with your approval.', 'Replacement of the flywheel is recommended – requires your approval.') },
    { id: 'pressure-plate', name: 'Pressure plate', why: 'It clamps the disc; weak springs cause slipping.', check: 'Spring load, diaphragm wear, heat spots', action: act('ARS to inspect the pressure plate.', 'Consider replacing the pressure plate with the disc – with your approval.', 'Replacement is recommended – requires your approval.') },
    { id: 'release-bearing', name: 'Release bearing', why: 'It is accessible only when the gearbox is separated, so wear is cheapest to address now.', check: 'Noise, roughness, play', action: act('ARS to inspect the release bearing.', 'Consider replacing the bearing while access is open – with your approval.', 'Replacement is recommended – requires your approval.') },
    { id: 'clutch-hydraulics', name: 'Clutch hydraulic components', why: 'Leaks or air in the system affect pedal feel and clutch release.', check: 'Master / slave cylinder leaks, fluid condition', action: act('ARS to inspect cylinders and fluid.', 'Consider servicing or replacing hydraulic parts – with your approval.', 'Replacement is recommended – requires your approval.') },
  ] },
  { id: 'brake', repair: 'Brake repair', primary: 'Brake pads / shoes', serviceSlug: 'brake-repair', related: [
    { id: 'discs', name: 'Brake discs', why: 'Worn or warped discs reduce braking performance and wear new pads faster.', check: 'Thickness, scoring, run-out', action: act('ARS to measure disc thickness and run-out.', 'Consider replacing or machining discs – with your approval.', 'Disc replacement is recommended – requires your approval.') },
    { id: 'calipers', name: 'Calipers', why: 'Seized slides or pistons cause uneven pad wear.', check: 'Piston movement, slide pins, seals', action: act('ARS to check caliper movement.', 'Consider servicing the caliper – with your approval.', 'Caliper replacement is recommended – requires your approval.') },
    { id: 'brake-fluid', name: 'Brake fluid', why: 'Old fluid absorbs moisture and can lower braking performance.', check: 'Fluid condition and level', action: act('ARS to test the fluid condition.', 'Consider a brake fluid change – with your approval.', 'Fluid change and system check are recommended – requires your approval.') },
    { id: 'brake-hoses', name: 'Brake hoses', why: 'Cracked or swollen hoses can restrict or leak fluid.', check: 'Cracks, bulges, leaks', action: act('ARS to inspect the hoses.', 'Consider replacing aged hoses – with your approval.', 'Hose replacement is recommended – requires your approval.') },
  ] },
  { id: 'engine', repair: 'Engine repair', primary: 'Engine', serviceSlug: 'engine-repair', related: [
    { id: 'cooling', name: 'Cooling system', why: 'Overheating is a common cause and consequence of engine problems.', check: 'Coolant level, radiator, thermostat, leaks', action: act('ARS to pressure-check the cooling system.', 'Consider servicing cooling components – with your approval.', 'Repair or replacement is recommended – requires your approval.') },
    { id: 'belts', name: 'Belts', why: 'Drive and timing belts are replaced more easily during engine work.', check: 'Cracks, glazing, tension', action: act('ARS to inspect belts.', 'Consider replacing belts – with your approval.', 'Replacement is recommended – requires your approval.') },
    { id: 'hoses', name: 'Hoses', why: 'Aged hoses can leak under heat and pressure.', check: 'Softness, swelling, seepage', action: act('ARS to inspect hoses.', 'Consider replacing aged hoses – with your approval.', 'Replacement is recommended – requires your approval.') },
    { id: 'mounts', name: 'Engine mounts', why: 'Worn mounts allow excess movement and vibration.', check: 'Cracking, collapse, vibration', action: act('ARS to inspect mounts.', 'Consider replacing mounts – with your approval.', 'Replacement is recommended – requires your approval.') },
  ] },
  { id: 'suspension', repair: 'Suspension repair', primary: 'Shock absorbers / springs', serviceSlug: 'suspension-repair', related: [
    { id: 'bushings', name: 'Bushings', why: 'Perished bushes cause noise and loose handling.', check: 'Cracks, play, noise', action: act('ARS to inspect bushings.', 'Consider replacing bushings – with your approval.', 'Replacement is recommended – requires your approval.') },
    { id: 'ball-joints', name: 'Ball joints', why: 'Worn joints affect steering and tyre wear.', check: 'Play, torn boots', action: act('ARS to check play.', 'Consider replacing ball joints – with your approval.', 'Replacement is recommended – requires your approval.') },
    { id: 'control-arms', name: 'Control arms', why: 'Bent or worn arms upset alignment.', check: 'Bends, cracks, bush condition', action: act('ARS to inspect control arms.', 'Consider replacing control arms – with your approval.', 'Replacement is recommended – requires your approval.') },
    { id: 'tie-rods', name: 'Tie rods', why: 'Loose tie rods affect steering precision.', check: 'Play, torn boots', action: act('ARS to check tie rods.', 'Consider replacing tie rods – with your approval.', 'Replacement is recommended – requires your approval.') },
  ] },
  { id: 'battery', repair: 'Battery replacement', primary: 'Battery', serviceSlug: 'battery-testing-replacement', related: [
    { id: 'alternator', name: 'Alternator', why: 'A weak alternator can drain even a new battery.', check: 'Charging output', action: act('ARS to test charging output.', 'Consider alternator service – with your approval.', 'Repair or replacement is recommended – requires your approval.') },
    { id: 'starter', name: 'Starter motor', why: 'A tired starter draws more current and strains the battery.', check: 'Cranking current, noise', action: act('ARS to test the starter.', 'Consider starter service – with your approval.', 'Repair or replacement is recommended – requires your approval.') },
    { id: 'terminals', name: 'Battery terminals', why: 'Corroded terminals mimic a failing battery.', check: 'Corrosion, clamp tightness', action: act('ARS to inspect terminals.', 'Consider cleaning or replacing terminals – with your approval.', 'Replacement is recommended – requires your approval.') },
  ] },
  { id: 'ac', repair: 'AC repair', primary: 'AC system', serviceSlug: 'ac-servicing', related: [
    { id: 'compressor', name: 'Compressor', why: 'The heart of the AC system; internal wear affects cooling.', check: 'Clutch engagement, noise, pressure', action: act('ARS to test compressor operation.', 'Consider compressor service – with your approval.', 'Repair or replacement is recommended – requires your approval.') },
    { id: 'condenser', name: 'Condenser', why: 'Blocked or damaged fins reduce heat rejection.', check: 'Fin damage, blockage, leaks', action: act('ARS to inspect the condenser.', 'Consider cleaning or replacing the condenser – with your approval.', 'Replacement is recommended – requires your approval.') },
    { id: 'evaporator', name: 'Evaporator', why: 'Contamination can cause odour and weak cooling.', check: 'Odour, airflow, leaks', action: act('ARS to inspect the evaporator.', 'Consider cleaning or replacing – with your approval.', 'Replacement is recommended – requires your approval.') },
    { id: 'filters', name: 'Filters', why: 'Clogged cabin filters restrict airflow.', check: 'Dirt load, airflow', action: act('ARS to inspect filters.', 'Consider replacing filters – with your approval.', 'Replacement is recommended – requires your approval.') },
  ] },
];
