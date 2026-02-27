# Fraser’s Weight Tracker

A trend-focused weight tracking application built with React.

This project emphasises statistical smoothing and percentage-based projections rather than reacting to individual daily measurements. The UI is intentionally minimal and built around a small custom utility system.

Live Demo: https://fraserelliott.github.io/weight-tracker/

---

## Overview

The core problem this app addresses is short-term weight volatility.

Daily weight measurements fluctuate due to hydration, sodium intake, glycogen storage, sleep, and stress. Reacting to single measurements introduces noise-driven decision making.

This application instead:

- Calculates a rolling 7-day average
- Projects percentage-based weekly goals
- Compares smoothed trend data against a compounded goal curve
- Encourages high-frequency logging to reduce statistical variance

---

## Key Features

- 7-day rolling average calculation (O(n) over sorted entries)
- Percentage-based weekly goal projection using compounding
- Date-based baseline selection for goal start
- Trend vs target comparison chart (Recharts)
- Persistent local storage
- Dark theme driven by CSS custom properties
- SPA deployment via GitHub Pages with client-side routing

---

## Goal Projection Model

Goals are defined as a weekly percentage change.

Rather than subtracting a fixed kg per week, the model compounds progress:

If `r` is weekly rate (e.g. 1% → 0.01):

```
targetWeight = baselineWeight * (1 - r) ^ weeksElapsed
```

For example:

```
0.99 ^ 52 ≈ 0.60
```

A sustained 1% weekly reduction over a year results in ~40% total reduction, not 52%.

This reinforces proportional scaling over arbitrary fixed targets.

---

## Rolling Average Implementation

- Entries are stored sorted by date (descending).
- The rolling average operates in O(n).
- Each entry averages up to 7 consecutive data points.
- Because the dataset remains sorted, lookup cost remains linear.

This prevents quadratic scaling behaviour that would occur if unsorted data required full rescans.

---

## Tech Stack

- React
- Vite
- Recharts
- My CSS utility library (https://github.com/fraserelliott/fe-utilities)
- My React component library (https://github.com/fraserelliott/fe-components)
- GitHub Pages (SPA routing)

Routing is handled via:

- `BrowserRouter` with `basename`
- Custom `404.html` redirect for SPA fallback

---

## Running Locally

Clone the repository:

```bash
git clone https://github.com/fraserelliott/weight-tracker.git
cd weight-tracker
npm install
```

Then start the dev server:

```bash
npm run dev
```

### Important: Update basename

Because the app is configured for GitHub Pages deployment, you must update the repository basename when deploying under a different repo name.

Update the repo constant in:

- `index.html`
- `App.jsx`
- `404.html`

---

## Build

```bash
npm run build
```

---

## Deployment

Deployment is configured for GitHub Pages:

```bash
npm run deploy
```

Ensure the `basename` matches the repository name before deploying.

---

## Version

**0.1.0** - Initial public release
Core functionality complete:

- Entry logging
- Rolling average smoothing
- Goal projection
- Chart comparison
- GitHub Pages deployment
