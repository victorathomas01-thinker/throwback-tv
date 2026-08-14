# Throwback TV

A browser-based nostalgic TV-guide prototype that recreates the feeling of channel surfing through older television eras.

## Overview

Throwback TV presents era-specific channels, shows, and episodes through a generated schedule rather than a conventional streaming-library interface. The prototype focuses on the experience of opening a guide, seeing what is "on," browsing channels, and changing a channel's era.

The project is intentionally a scheduling and discovery interface. It does **not** host or stream copyrighted television content.

## Current Features

- Multiple nostalgia-focused channels
- Era-specific show and episode datasets
- Generated 30-minute programming blocks
- Four visible schedule slots per channel
- Live "Now Playing" state based on the current clock
- Search by channel, show, episode, or category
- Clickable channel detail panel
- Per-channel era switching
- Manual schedule refresh
- Clean and CRT-inspired display modes
- Deterministic show and episode rotation
- Automatic re-render every minute

## Tech Stack

- HTML
- CSS
- JavaScript
- Browser DOM APIs

No framework, backend, build system, or account layer is required for the current prototype.

## Architecture

The application is organized around a simple client-side flow:

`Data → State → Schedule Generator → Render → Events`

### Data

`script.js` contains channel definitions, era-specific programming pools, show categories, and episode lists.

### State

The app tracks the selected channel, generated schedule, and active search query. Each channel also stores its currently selected era.

### Schedule Generator

The generator creates four 30-minute programming slots for every channel. Shows and episodes currently rotate deterministically, which makes the behavior easy to understand while the scheduling model is still a prototype.

### Render

The UI renders:

- the time header
- channel rows
- program cards
- the current program
- remaining minutes
- channel details and era controls

### Events

User interactions handle:

- guide search
- channel selection
- era changes
- clean/CRT mode switching
- schedule refresh

## Run Locally

1. Download or clone the repository.
2. Open `index.html` in a modern browser.
3. Use the search field to filter the current guide.
4. Click a channel name to switch its era.
5. Toggle Clean Mode or CRT Mode to change presentation.

## Why I Built It

I wanted to explore a nostalgia-focused entertainment product that did not simply imitate a modern streaming homepage. The interesting part to me was the older TV experience itself: schedules, channels, discovery, programming blocks, and the feeling that something is already on when you arrive.

The project gave me practice with application state, time-based logic, structured content data, deterministic generation, DOM rendering, filtering, and interactive UI behavior in vanilla JavaScript.

## Current Limitations

- Programming data is manually defined in the source.
- Scheduling is deterministic rather than weighted by time of day, category, ratings, seasons, or holidays.
- Era selections are not persisted after the page is closed.
- The guide is horizontally scrollable rather than fully responsive on small screens.
- There is no playback layer or external streaming integration.

## Planned Improvements

- Weighted scheduling rules
- Saved viewing and era preferences
- Expanded channel and era datasets
- More sophisticated daypart and holiday programming
- Improved mobile layout
- Program detail views
- Better schedule navigation across larger time windows

## Copyright Note

Throwback TV is a personal software project intended to demonstrate interface, scheduling, and discovery concepts. It does not host or distribute copyrighted television or film content. Referenced titles and channel names remain the property of their respective rights holders.
