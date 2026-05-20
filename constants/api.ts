// Jolpica F1 API (Ergast-compatible replacement)
export const F1_API_BASE = 'https://api.jolpi.ca/ergast/f1';

export const CURRENT_SEASON = new Date().getFullYear().toString();

export function buildApiUrl(path: string): string {
  return `${F1_API_BASE}${path}`;
}
