# Throwback TV 2.0

Throwback TV is a browser-based simulated cable experience built around one idea: nostalgia feels different when something is already on.

Instead of presenting old shows as a streaming library, Throwback TV generates an always-running television schedule. You tune into channels, arrive partway through programs, browse an electronic program guide, change each channel's era, and optionally jump to another date to create a different deterministic lineup.

> The original learning prototype remains on the `main` branch. This rebuild lives on the `2.0` branch.

## What changed in 2.0

The original prototype generated four simple 30-minute slots using deterministic rotation. 2.0 replaces that with a small broadcast simulation engine.

- 24-hour schedules: every channel gets 48 half-hour blocks per date.
- Deterministic generation: the same channel + era + date produces the same lineup.
- Daypart weighting: morning, after-school, prime-time, and late-night programming use different show weights.
- Weekend behavior: weekend mornings favor animation/action programming more heavily.
- Seasonal context: summer, Halloween, and holiday periods are reflected in the presentation and are ready for deeper scheduling rules.
- Real tune-in behavior: if you arrive 17 minutes into a block, the player reports that you are 17 minutes in.
- Channel surfing: use the on-screen CH buttons or the keyboard up/down arrows.
- Six-slot EPG: move earlier/later through the day or jump back to the current time.
- Per-channel eras: Jetix can be 2006 while Disney Channel is 2004 and Nickelodeon is 2005.
- Time machine: choose a calendar date and the deterministic scheduler produces that date's lineup.
- Favorites: starred channels rise to the top of the guide.
- Persistent preferences: era choices, favorites, CRT mode, selected date, and tuned channel survive reloads through localStorage.
- Search: filter channels and visible programs by channel, show, episode, or category.
- Responsive UI: the TV/player area stacks cleanly on smaller screens while the guide remains horizontally browsable.
- CRT mode: optional scanline treatment without making it the only visual style.

## Current channel catalog

2.0 ships with starter metadata for:

- Jetix
- Disney Channel
- Toon Disney
- Nickelodeon
- Cartoon Network

The catalog is intentionally separated into `data.js`, so expanding channels, eras, shows, categories, daypart preferences, and episodes does not require rewriting the app engine.

## Architecture

The current no-build architecture is deliberately simple enough to inspect while leaving room to grow:

`data.js -> persisted state -> seeded scheduler -> broadcast clock -> guide/player render -> interactions`

### `data.js`

Contains channel metadata, channel numbers, available eras, shows, episodes, categories, and preferred dayparts.

### `script.js`

Owns:

- seeded deterministic randomization
- weighted show selection
- daily schedule generation and caching
- date/daypart/weekend logic
- localStorage state
- guide rendering
- tune-in progress
- channel surfing
- search, favorites, eras, and time-machine interactions

### `style.css`

Contains the responsive visual system, TV frame, guide, current-program states, modal, and optional CRT treatment.

## Controls

- **CH − / CH +**: surf channels.
- **Keyboard Up / Down**: surf channels when focus is not inside an input.
- **Star**: favorite/unfavorite the tuned channel.
- **Time machine**: choose another date.
- **Earlier / Later**: move the visible guide by 90 minutes.
- **Jump to now**: center the guide near the current time of day.
- **Click a program**: tune to that channel.
- **Click a channel name**: open channel settings and select its era.
- **CRT**: toggle the scanline presentation.

## Running locally

There is no build step yet.

1. Clone or download the repository.
2. Check out the `2.0` branch.
3. Open `index.html` in a modern browser.

A local static server is optional but recommended once API integrations or modules are introduced.

## Product direction

The goal is eventually closer to a time-machine cable box than a conventional streaming interface. Areas planned for future iterations include:

- richer historical schedule research and presets
- variable program lengths instead of only 30-minute blocks
- movies and specials
- named programming blocks and marathons
- premiere/repeat rules
- holiday-specific episode weighting
- bumpers and commercial-slot metadata
- program detail screens
- watch/favorite history
- a larger normalized metadata layer or database
- legitimate external playback/deep-link integrations where available
- optional accounts and cloud sync
- PWA/TV-device controls
- automated scheduler tests
- accessibility and keyboard-navigation passes

## Copyright

Throwback TV is a software/interface project. It does **not** host, redistribute, or provide copyrighted television video. Program and channel names are used as descriptive metadata; their respective rights remain with their owners.
