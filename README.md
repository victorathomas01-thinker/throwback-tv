# Throwback TV

A browser-based nostalgic TV guide prototype that recreates the feeling of channel surfing through older television eras.

## Overview

Throwback TV presents era-specific channels, shows, and episodes through a generated schedule rather than a conventional streaming-library interface. The current prototype focuses on the experience of opening a TV guide, seeing what is "on," switching between channels, and browsing programming from different eras.

The project is intentionally a discovery and scheduling experience rather than a platform for hosting copyrighted video.

## Current Prototype Features

- Era selector for changing the style and programming pool
- Multiple nostalgia-focused channels
- Era-specific show and episode data
- Generated 30-minute programming schedules
- Four visible schedule slots per channel
- "Now Playing" state
- Search field
- Channel detail views
- Schedule refresh controls
- Clean and CRT-inspired display modes
- Deterministic show/episode rotation

## Tech Stack

- HTML
- CSS
- JavaScript

The current implementation is intentionally lightweight and browser-based, with no production backend or account system.

## Architecture

The prototype is organized around a straightforward client-side flow:

`Data → State → Schedule Generator → Render → Events`

### Data

Stores the channels, shows, episodes, and era-specific programming information used by the guide.

### State

Tracks the active era, selected channel, current schedule, search state, and display preferences.

### Schedule Generator

Builds the channel lineup and rotates through show/episode data to create repeatable schedule blocks.

### Render

Updates the guide, Now Playing information, channel details, and other interface elements from the current application state.

### Events

Handles user interaction such as selecting eras, changing channels, searching, refreshing schedules, and switching display modes.

## Why I Built It

I wanted to explore a different way to build a nostalgia-focused entertainment product. Instead of cloning a modern streaming homepage, I focused on the experience of older television: schedules, channels, discovery, and the feeling that something is already "on" when you arrive.

The project gave me practice designing application state, generating structured schedules from content data, building interactive browser interfaces, and organizing a small JavaScript application around a clear data flow.

## Project Status

**Working browser prototype / work in progress.**

The public repository is being organized for portfolio use. The existing prototype source will be added as it is cleaned up for public release.

## Planned Improvements

Ideas already identified for later iterations include:

- Weighted scheduling instead of purely deterministic rotation
- Saved viewing/progress state
- Expanded channel and era data
- More sophisticated programming rules
- Additional nostalgic display options
- Improved schedule navigation and discovery

## Copyright Note

Throwback TV is a personal software project intended to demonstrate interface, scheduling, and discovery concepts. It does not host or distribute copyrighted television or film content. Any referenced titles remain the property of their respective rights holders.
