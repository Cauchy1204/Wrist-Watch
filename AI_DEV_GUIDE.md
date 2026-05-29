# AI Development Guide

## Purpose

Wrist Watch / Rise the Watch is a mobile-first PWA prototype for right-wrist symptom tracking. It records local symptom check-ins, shows history and trends, and generates a pre-visit summary for a clinician. The app is frontend-only for now and stores data in localStorage.

## Folder Structure

- `src/app`: Next.js App Router pages. Keep these files thin.
- `src/components/layout`: app shell, page frame, and bottom navigation.
- `src/components/ui`: shared presentational primitives such as `Button`, `Card`, `PageHeader`, `SegmentedControl`, `StatCard`, and `SectionTitle`.
- `src/components/dashboard`: dashboard-specific UI and chart pieces.
- `src/components/record`: record-flow orchestration and individual flow steps.
- `src/components/hand-selector`: wrist selector image rendering, hotspot overlays, and hotspot definitions.
- `src/components/timeline`: timeline-specific record display components.
- `src/components/summary`: summary-specific display components.
- `src/lib`: non-UI logic for storage, parsing, summaries, dates, and utilities.
- `src/types`: shared TypeScript domain types.
- `src/styles`: design tokens and style constants.
- `public/assets`: static hand/wrist assets used by the selector.

## Page Ownership

- `/`: `src/app/page.tsx`
  Main dashboard route. It should only compose dashboard components and connect data hooks.
- `/record`: `src/app/record/page.tsx`
  Record route shell. The flow lives in `src/components/record/RecordFlow.tsx`.
- `/timeline`: `src/app/timeline/page.tsx`
  Timeline route. Record cards live in `src/components/timeline/TimelineRecordCard.tsx`.
- `/trends`: `src/app/trends/page.tsx`
  Trends route and chart composition.
- `/summary`: `src/app/summary/page.tsx`
  Summary route. Summary rows live in `src/components/summary/SummaryRow.tsx`.
- `/settings`: `src/app/settings/page.tsx`
  Settings route and local settings controls.

## Dashboard Edits

For dashboard-only changes, start in `src/components/dashboard`:

- `DashboardHeader.tsx`: greeting, hero metrics, and sparkline container.
- `TodayStatusCard.tsx`: no-record reminder card and no-symptom action.
- `QuickRecordButton.tsx`: main quick check-in CTA.
- `RecentRecordCard.tsx`: latest symptom card.
- `QuickActionGrid.tsx`: feature entry grid and local status stat cards.
- `DashboardSparkline.tsx`: compact trend chart.

Only touch `src/app/page.tsx` if the dashboard data wiring or component order changes.

## Record Flow Edits

For record-flow changes, start in `src/components/record`:

- `RecordFlow.tsx`: flow state, parser wiring, save behavior, and step routing.
- `StepIndicator.tsx`: back button and progress bar.
- `SymptomLocationStep.tsx`: Palm/Dorsal selector step.
- `SymptomTextStep.tsx`: simulated voice text input step.
- `ParsedResultStep.tsx`: editable parser result step.
- `SaveCompleteStep.tsx`: completion screen.
- `EditableField.tsx`: shared editable input used by parsed results.

Only touch `src/app/record/page.tsx` if the route shell itself changes.

## Hand Selector Edits

For hand selector changes, stay inside `src/components/hand-selector`:

- `WristSelector.tsx`: selector shell and hover CSS.
- `PalmView.tsx`: palm asset and palm hotspot layer.
- `DorsalView.tsx`: dorsal asset and dorsal hotspot layer.
- `HotspotLayer.tsx`: shared SVG overlay rendering.
- `hotspots.ts`: clickable wrist region paths.

Do not redraw, regenerate, crop, or replace `public/assets/palm-right-hand.png` or `public/assets/dorsal-right-hand.png` unless explicitly requested.

## UI Tokens

Shared visual constants live in `src/styles/tokens.ts`. Use this file for stable color, gradient, shadow, radius, spacing, typography, and motion values. Do not rewrite broad className surfaces just to consume a token; use tokens when they make future scoped edits clearer.

## Do Not Touch During UI-Only Tasks

- `src/types/symptom.ts`
- `src/lib/storage.ts`
- `src/lib/symptom-parser.ts`
- `src/lib/summary.ts`
- `src/lib/date.ts`
- `public/assets/palm-right-hand.png`
- `public/assets/dorsal-right-hand.png`

UI-only tasks should not change data shape, localStorage keys, parser behavior, summary calculations, navigation routes, or hand assets.

## Edit Rules

- Always make scoped edits and avoid full-app rewrites.
- Keep route files thin; move page-specific UI into the matching component folder.
- For UI-only tasks, do not change data shape, storage behavior, parser behavior, or navigation.
- For behavior-only tasks, avoid visual redesigns and broad className churn.
- Put shared UI into `src/components/ui`; put route-specific components in that route's component folder.
- Put all symptom domain types in `src/types/symptom.ts`.
- Put non-UI logic in `src/lib`, not inside page components.

## Validation

After structural edits, run:

```bash
npm run build
```

Check these routes remain accessible:

- `/`
- `/record`
- `/timeline`
- `/trends`
- `/summary`
- `/settings`
