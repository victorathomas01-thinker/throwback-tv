# Throwback TV 2.0 Roadmap

This branch is the clean rebuild. The guiding rule is simple: preserve the feeling of scheduled television instead of drifting toward a normal streaming-library UI.

## Phase 1 — Broadcast simulation foundation

Status: in progress / usable

- Continuous 24-hour deterministic schedules
- Daypart-aware weighting
- Weekend-aware weighting
- Per-channel era selection
- Time-machine date selection
- Tune-in progress
- Channel surfing
- Search
- Favorites
- Persistent browser preferences
- Responsive guide/player shell
- CRT presentation option

## Phase 2 — Make the schedule feel programmed by humans

- Variable durations: 15, 30, 60, 90 and 120 minutes
- Movies and specials
- Named blocks (Saturday morning, after-school, action blocks, late night)
- Show streak limits and intentional back-to-back episodes
- Premiere vs repeat metadata
- Series ordering when appropriate
- Seasonal episode tags and weighting
- Holiday takeovers
- Marathons
- Channel-specific scheduling personalities
- School-day vs summer behavior
- More historically grounded era catalogs

## Phase 3 — Make channel surfing feel like television

- Short tuning/static transition
- Optional bumper/interstitial metadata between programs
- Program info overlay that fades after tuning
- Last-channel button
- Numeric channel input
- Mini guide overlay while staying on the player
- Remote-control-friendly keyboard navigation
- Fullscreen TV mode
- Volume/mute UI hooks for future legitimate playback sources

## Phase 4 — Better guide and discovery

- Variable-width EPG blocks based on duration
- Scrollable multi-hour timeline
- Current-time marker
- Program detail panel
- Favorites-only guide filter
- Category filters
- Search across the whole day instead of only the visible window
- Recommendations based on favorite channels/shows without turning the app into Netflix
- “What should I leave on?” quick tune

## Phase 5 — Data architecture

- Move catalog from hand-authored JavaScript into normalized JSON or a database
- Schema validation
- Import scripts for legitimate public metadata sources
- Historical schedule import format
- Episode IDs instead of title-only matching
- Channel rebrands and era validity windows
- Schedule rule configuration separate from show metadata
- Automated tests for deterministic generation and scheduling constraints

## Phase 6 — Legitimate playback integrations

Throwback TV itself should not become a piracy host.

- Playback-provider abstraction
- Deep links to legitimate streaming services when available
- Local-media adapter for media the user legally possesses
- Optional authorized/public-domain media sources
- Start-offset support so tuning at 7:17 can begin 17 minutes into compatible media
- Fallback metadata-only simulation when playback is unavailable

## Phase 7 — Product-quality app

- PWA installation
- TV/desktop layouts
- Accessibility audit
- Reduced-motion support
- Profiles and optional cloud sync
- Schedule sharing (“look what’s on my 2005 lineup tonight”)
- Import/export preferences
- Error telemetry that does not collect viewing data unnecessarily
- Deployment pipeline and automated checks

## Non-negotiables

1. Opening the app should feel like turning on a TV, not choosing something from a catalog.
2. The schedule should exist independently of the user.
3. Arriving late means arriving late.
4. Channel and era identity should strongly affect programming behavior.
5. Historical flavor should improve as evidence/data improves; uncertain information should not be presented as verified history.
6. Copyrighted video is not hosted or redistributed by the project.
