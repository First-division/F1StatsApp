export const TEAM_COLORS: Record<string, string> = {
  // 2025/2026 teams
  red_bull: '#3671C6',
  ferrari: '#E8002D',
  mercedes: '#27F4D2',
  mclaren: '#FF8000',
  aston_martin: '#229971',
  alpine: '#FF87BC',
  williams: '#64C4FF',
  haas: '#B6BABD',
  kick_sauber: '#52E252',
  sauber: '#52E252',
  rb: '#6692FF',
  alphatauri: '#6692FF',
  racing_point: '#F596C8',
  renault: '#FFF500',
  toro_rosso: '#469BFF',
  force_india: '#F596C8',
  lotus_f1: '#FFB800',
};

export const TEAM_ABBREVIATIONS: Record<string, string> = {
  red_bull: 'RBR',
  ferrari: 'FER',
  mercedes: 'MER',
  mclaren: 'MCL',
  aston_martin: 'AMR',
  alpine: 'ALP',
  williams: 'WIL',
  haas: 'HAS',
  kick_sauber: 'KSB',
  sauber: 'KSB',
  rb: 'RB',
  alphatauri: 'RB',
};

export function getTeamColor(constructorId: string): string {
  return TEAM_COLORS[constructorId] ?? '#ffffff';
}

export function getPositionColor(position: number): string {
  if (position === 1) return '#FFD700';
  if (position === 2) return '#C0C0C0';
  if (position === 3) return '#CD7F32';
  return '#666666';
}
