# F1 Stats App

A React Native app built with **Expo** and **Expo Router v6 (unstable)** for tracking Formula 1 racing statistics.

## Features

- **Home Dashboard** — Season overview, next race countdown, top standings
- **Driver Standings** — Full championship standings with season selector
- **Constructor Standings** — Team championship standings with season selector
- **Race Schedule** — Full calendar with upcoming/past filters
- **Driver Profiles** — Career info, season stats, race-by-race results
- **Race Results** — Full race results with podium highlight

## Stack

| Tech | Version |
|------|---------|
| Expo | ~53.0.0 |
| Expo Router | ~6.0.0-canary (unstable v6) |
| React Native | 0.79.2 |
| TypeScript | ~5.8.0 |

## Data Source

Uses the [Jolpica F1 API](https://api.jolpi.ca/ergast/) — an open, Ergast-compatible REST API for Formula 1 data.

## Getting Started

```bash
npm install
npx expo start
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with the Expo Go app.

## Project Structure

```
app/
  _layout.tsx          # Root stack navigator
  (tabs)/
    _layout.tsx        # Tab bar navigator
    index.tsx          # Home screen
    drivers.tsx        # Driver standings
    constructors.tsx   # Constructor standings
    races.tsx          # Race schedule
  driver/[driverId].tsx   # Driver detail screen
  race/[season]/[round].tsx  # Race results screen
components/            # Reusable UI components
hooks/                 # Data-fetching hooks (fetch + useState)
constants/             # Colors, team colors, API config
types/                 # TypeScript types for F1 API responses
```
