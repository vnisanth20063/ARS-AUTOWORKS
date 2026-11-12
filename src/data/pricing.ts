// Configurable pricing. Leave a service or package out (or null) to show "Request a quote".
// Only add prices ARS has approved.
export const servicePrices: Record<string, number | null> = {
  // 'clay-bar-descaling-wash': 0,
};
export const packagePrices: Record<string, number | null> = {
  // 'interior-refresh': 0,
};
// Optional breakdowns for the guided-booking estimate. Leave empty until ARS supplies approved figures.
export const labourPrices: Record<string, number | null> = {};
export const partsPrices: Record<string, number | null> = {};
