import type { Condition } from './inspection';
// SAMPLE data for the Digital Vehicle Health Report demo. Not a real vehicle and not real diagnostics.
export interface HealthSystem { id: string; name: string; note: string; status: Condition; parts: string[]; maintenance: string; preventive: string }
export const sampleVehicle = { name: 'Sample vehicle', detail: 'Demo data – Sedan, 2019, Petrol', odometer: 'Not recorded', date: 'Sample inspection' };
export const healthSystems: HealthSystem[] = [
  { id: 'engine', name: 'Engine', note: 'Idle and bay condition recorded by technician.', status: 'good', parts: ['Belts', 'Hoses', 'Engine mounts'], maintenance: 'Routine oil and filter service per manufacturer schedule.', preventive: 'Replace belts and hoses at the manufacturer interval.' },
  { id: 'brakes', name: 'Brakes', note: 'Pad and disc measurements entered manually.', status: 'inspect', parts: ['Brake discs', 'Calipers', 'Brake fluid'], maintenance: 'Brake fluid test and pad thickness check.', preventive: 'Consider replacing pads before they reach minimum thickness – with customer approval.' },
  { id: 'battery', name: 'Battery', note: 'Test result entered manually.', status: 'worn', parts: ['Battery', 'Terminals', 'Alternator'], maintenance: 'Terminal cleaning and charging test.', preventive: 'Plan a battery replacement; inspect the alternator at the same time.' },
  { id: 'suspension', name: 'Suspension', note: 'Visual check on a lift.', status: 'good', parts: ['Bushings', 'Ball joints', 'Tie rods'], maintenance: 'Periodic underbody inspection.', preventive: 'No action recommended.' },
  { id: 'tyres', name: 'Tyres', note: 'Tread depth and sidewalls checked.', status: 'inspect', parts: ['Front tyres', 'Alignment'], maintenance: 'Rotation and alignment check.', preventive: 'Check alignment if uneven wear is found.' },
  { id: 'ac', name: 'AC', note: 'Cooling performance entered manually.', status: 'good', parts: ['Compressor', 'Condenser', 'Cabin filter'], maintenance: 'Annual AC service.', preventive: 'Replace cabin filter at the service interval.' },
  { id: 'transmission', name: 'Transmission', note: 'Shift quality noted on road test.', status: 'good', parts: ['Clutch / gearbox oil'], maintenance: 'Fluid check per schedule.', preventive: 'No action recommended.' },
  { id: 'electrical', name: 'Electrical', note: 'Lights and accessories tested.', status: 'damaged', parts: ['Left tail lamp', 'Power window switch'], maintenance: 'Wiring and connector check.', preventive: 'Repair the faulty items – requires customer approval.' },
];
