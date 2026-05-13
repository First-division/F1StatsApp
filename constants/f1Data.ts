export type RaceWeekend = {
  round: number;
  name: string;
  circuit: string;
  date: string;
  location: string;
};

export const nextRace: RaceWeekend = {
  round: 9,
  name: 'Canadian Grand Prix',
  circuit: 'Circuit Gilles Villeneuve',
  date: 'June 15',
  location: 'Montreal, Canada',
};

export const constructorStandings = [
  { team: 'McLaren', points: 247 },
  { team: 'Ferrari', points: 221 },
  { team: 'Red Bull', points: 198 },
  { team: 'Mercedes', points: 176 },
];

export const seasonHighlights = [
  { label: 'Rounds complete', value: '8 / 24' },
  { label: 'Sprint weekends', value: '6' },
  { label: 'Drivers in points', value: '17' },
];

export const upcomingRaceWeekends: RaceWeekend[] = [
  nextRace,
  {
    round: 10,
    name: 'Spanish Grand Prix',
    circuit: 'Circuit de Barcelona-Catalunya',
    date: 'June 29',
    location: 'Barcelona, Spain',
  },
  {
    round: 11,
    name: 'Austrian Grand Prix',
    circuit: 'Red Bull Ring',
    date: 'July 13',
    location: 'Spielberg, Austria',
  },
  {
    round: 12,
    name: 'British Grand Prix',
    circuit: 'Silverstone Circuit',
    date: 'July 20',
    location: 'Silverstone, United Kingdom',
  },
];
