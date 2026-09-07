// Throwback TV 2.0
// A deterministic simulated broadcast engine. No video is hosted by this project.

const CHANNELS = window.THROWBACK_CHANNELS || [];
const SLOT_MINUTES = 30;
const GUIDE_SLOTS = 6;
const STORAGE_KEY = "throwback-tv-2-state";

function pad(value) { return String(value).padStart(2, "0"); }
function localDateKey(date) { return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`; }
function todayKey() { return localDateKey(new Date()); }
function currentMinutes() { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); }
function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

function loadSavedState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch (_) { return {}; }
}

const saved = loadSavedState();
const state = {
  selectedDate: saved.selectedDate || todayKey(),
  tunedChannelId: saved.tunedChannelId || CHANNELS[0]?.id || null,
  eraByChannel: saved.eraByChannel || {},
  favorites: new Set(saved.favorites || []),
  crt: Boolean(saved.crt),
  search: "",
  windowStartSlot: 0,
  scheduleCache: new Map(),
  modalChannelId: null
};

for (const channel of CHANNELS) {
  if (!channel.eras[state.eraByChannel[channel.id]]) state.eraByChannel[channel.id] = channel.defaultEra;
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    selectedDate: state.selectedDate,
    tunedChannelId: state.tunedChannelId,
    eraByChannel: state.eraByChannel,
    favorites: [...state.favorites],
    crt: state.crt
  }));
}

function hashString(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededUnit(seed) {
  let x = seed + 0x6D2B79F5;
  x = Math.imul(x ^ (x >>> 15), x | 1);
  x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
  return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
}

function daypartForMinute(minute) {
  if (minute < 360) return "late";
  if (minute < 720) return "morning";
  if (minute < 1020) return "after-school";
  if (minute < 1320) return "prime";
  return "late";
}

function daypartLabel(minute) {
  return ({ morning: "Morning", "after-school": "After School", prime: "Prime Time", late: "Late Night" })[daypartForMinute(minute)];
}

function dateInfo(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return { date, month, day, weekday: date.getDay(), weekend: date.getDay() === 0 || date.getDay() === 6 };
}

function seasonalLabel(dateKey) {
  const { month, day } = dateInfo(dateKey);
  if (month === 10) return "Halloween season";
  if (month === 12 && day >= 1 && day <= 26) return "Holiday season";
  if (month >= 6 && month <= 8) return "Summer lineup";
  return null;
}

function weightedPick(items, weightFor, seed) {
  const weights = items.map(item => Math.max(0.05, weightFor(item)));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let target = seededUnit(seed) * total;
  for (let i = 0; i < items.length; i += 1) {
    target -= weights[i];
    if (target <= 0) return items[i];
  }
  return items[items.length - 1];
}

function chooseShow(channel, eraKey, dateKey, slotIndex) {
  const era = channel.eras[eraKey];
  const minute = slotIndex * SLOT_MINUTES;
  const daypart = daypartForMinute(minute);
  const { weekend } = dateInfo(dateKey);
  const seedBase = hashString(`${channel.id}|${eraKey}|${dateKey}|${slotIndex}`);

  return weightedPick(era.shows, show => {
    let weight = show.dayparts?.includes(daypart) ? 5 : 0.7;
    if (weekend && daypart === "morning" && ["animation", "action", "anime", "action-comedy"].includes(show.category)) weight += 2.5;
    if (!weekend && daypart === "after-school") weight += 1;
    if (daypart === "late" && show.dayparts?.includes("late")) weight += 2;
    return weight;
  }, seedBase);
}

function buildDaySchedule(channel, dateKey) {
  const eraKey = state.eraByChannel[channel.id];
  const cacheKey = `${channel.id}|${eraKey}|${dateKey}`;
  if (state.scheduleCache.has(cacheKey)) return state.scheduleCache.get(cacheKey);

  const programs = [];
  let lastTitle = null;
  for (let slot = 0; slot < 48; slot += 1) {
    let show = chooseShow(channel, eraKey, dateKey, slot);
    const shows = channel.eras[eraKey].shows;

    // Avoid accidental three-hour runs unless the deterministic seed explicitly keeps landing there.
    if (show.title === lastTitle && shows.length > 1) {
      const alternativeSeed = hashString(`${cacheKey}|alt|${slot}`);
      const alternatives = shows.filter(candidate => candidate.title !== lastTitle);
      if (seededUnit(alternativeSeed) > 0.35) show = alternatives[Math.floor(seededUnit(alternativeSeed + 19) * alternatives.length)];
    }

    const episodeSeed = hashString(`${cacheKey}|${show.title}|episode|${slot}`);
    const episode = show.episodes[Math.floor(seededUnit(episodeSeed) * show.episodes.length)];
    const startMinute = slot * SLOT_MINUTES;
    programs.push({
      channelId: channel.id,
      eraKey,
      startMinute,
      endMinute: startMinute + SLOT_MINUTES,
      show: show.title,
      episode,
      category: show.category,
      daypart: daypartForMinute(startMinute)
    });
    lastTitle = show.title;
  }

  state.scheduleCache.set(cacheKey, programs);
  return programs;
}

function simulatedMinutes() {
  // Historical dates keep the user's current time of day, making the selected date feel like "today" in that era.
  return currentMinutes();
}

function currentProgram(channel) {
  const minute = simulatedMinutes();
  const slot = clamp(Math.floor(minute / SLOT_MINUTES), 0, 47);
  return buildDaySchedule(channel, state.selectedDate)[slot];
}

function formatMinute(total) {
  const minute = ((total % 1440) + 1440) % 1440;
  let hour = Math.floor(minute / 60);
  const mins = minute % 60;
  const suffix = hour >= 12 ? "PM" : "AM";
  hour %= 12;
  if (hour === 0) hour = 12;
  return `${hour}:${pad(mins)} ${suffix}`;
}

function formatSelectedDate() {
  const [year, month, day] = state.selectedDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function tunedChannel() { return CHANNELS.find(channel => channel.id === state.tunedChannelId) || CHANNELS[0]; }
function isSelectedDateToday() { return state.selectedDate === todayKey(); }

const els = {
  searchInput: document.getElementById("searchInput"), crtButton: document.getElementById("crtButton"),
  screen: document.getElementById("screen"), channelBug: document.getElementById("channelBug"), screenTitle: document.getElementById("screenTitle"),
  screenEpisode: document.getElementById("screenEpisode"), screenMeta: document.getElementById("screenMeta"), tuneOverlay: document.getElementById("tuneOverlay"),
  liveClock: document.getElementById("liveClock"), dateLabel: document.getElementById("dateLabel"), previous: document.getElementById("previousChannelButton"),
  next: document.getElementById("nextChannelButton"), favorite: document.getElementById("favoriteButton"), tunedName: document.getElementById("tunedChannelName"),
  tunedTagline: document.getElementById("tunedChannelTagline"), tunedDescription: document.getElementById("tunedDescription"), progress: document.getElementById("programProgress"),
  elapsed: document.getElementById("elapsedLabel"), remaining: document.getElementById("remainingLabel"), dateInput: document.getElementById("dateInput"),
  today: document.getElementById("todayButton"), earlier: document.getElementById("earlierButton"), later: document.getElementById("laterButton"),
  jumpNow: document.getElementById("jumpNowButton"), guideWindowLabel: document.getElementById("guideWindowLabel"), timeHeader: document.getElementById("timeHeader"),
  guideRows: document.getElementById("guideRows"), emptyState: document.getElementById("emptyState"), channelModal: document.getElementById("channelModal"),
  closeModal: document.getElementById("closeModalButton"), modalName: document.getElementById("modalChannelName"), modalDescription: document.getElementById("modalChannelDescription"),
  eraSelect: document.getElementById("eraSelect"), home: document.getElementById("homeButton")
};

function renderPlayer() {
  const channel = tunedChannel();
  if (!channel) return;
  const program = currentProgram(channel);
  const minute = simulatedMinutes();
  const elapsed = clamp(minute - program.startMinute, 0, SLOT_MINUTES);
  const remaining = SLOT_MINUTES - elapsed;
  const progress = (elapsed / SLOT_MINUTES) * 100;
  const seasonal = seasonalLabel(state.selectedDate);

  els.channelBug.textContent = `${channel.number}  ${channel.name}`;
  els.screenTitle.textContent = program.show;
  els.screenEpisode.textContent = program.episode;
  els.screenMeta.textContent = `${formatMinute(program.startMinute)}–${formatMinute(program.endMinute)} · ${state.eraByChannel[channel.id]} · ${daypartLabel(program.startMinute)}${seasonal ? ` · ${seasonal}` : ""}`;
  els.liveClock.textContent = formatMinute(minute);
  els.dateLabel.textContent = isSelectedDateToday() ? "Live" : formatSelectedDate();
  els.tunedName.textContent = `${channel.number} · ${channel.name}`;
  els.tunedTagline.textContent = channel.tagline;
  els.tunedDescription.textContent = channel.description;
  els.progress.style.width = `${progress}%`;
  els.elapsed.textContent = `${elapsed} min in`;
  els.remaining.textContent = `${remaining} min left`;
  els.favorite.textContent = state.favorites.has(channel.id) ? "★" : "☆";
  els.favorite.title = state.favorites.has(channel.id) ? "Remove favorite" : "Add favorite";
  els.screen.style.setProperty("--channel-accent", channel.accent);
}

function renderTimeHeader() {
  els.timeHeader.innerHTML = "";
  const first = document.createElement("div");
  first.className = "time-cell";
  first.textContent = "CHANNEL";
  els.timeHeader.appendChild(first);
  for (let i = 0; i < GUIDE_SLOTS; i += 1) {
    const cell = document.createElement("div");
    cell.className = "time-cell";
    cell.textContent = formatMinute((state.windowStartSlot + i) * SLOT_MINUTES);
    els.timeHeader.appendChild(cell);
  }
  const start = state.windowStartSlot * SLOT_MINUTES;
  const end = (state.windowStartSlot + GUIDE_SLOTS) * SLOT_MINUTES;
  els.guideWindowLabel.textContent = `${formatSelectedDate()} · ${formatMinute(start)}–${formatMinute(end)}`;
}

function rowMatches(channel, programs) {
  const query = state.search.trim().toLowerCase();
  if (!query) return true;
  if (`${channel.name} ${channel.description} ${channel.tagline}`.toLowerCase().includes(query)) return true;
  return programs.some(p => `${p.show} ${p.episode} ${p.category}`.toLowerCase().includes(query));
}

function renderGuide() {
  renderTimeHeader();
  els.guideRows.innerHTML = "";
  let visibleRows = 0;
  const nowSlot = Math.floor(simulatedMinutes() / SLOT_MINUTES);

  const orderedChannels = [...CHANNELS].sort((a, b) => {
    const favDelta = Number(state.favorites.has(b.id)) - Number(state.favorites.has(a.id));
    return favDelta || a.number - b.number;
  });

  for (const channel of orderedChannels) {
    const day = buildDaySchedule(channel, state.selectedDate);
    const programs = [];
    for (let i = 0; i < GUIDE_SLOTS; i += 1) programs.push(day[state.windowStartSlot + i]);
    if (!rowMatches(channel, programs)) continue;
    visibleRows += 1;

    const row = document.createElement("div");
    row.className = "guide-row";

    const channelCell = document.createElement("button");
    channelCell.className = "channel-cell";
    channelCell.dataset.channelId = channel.id;
    channelCell.innerHTML = `<span class="channel-number">CH ${channel.number}${state.favorites.has(channel.id) ? " · ★" : ""}</span><span class="channel-name">${channel.name}</span><span class="channel-era">${state.eraByChannel[channel.id]}</span>`;
    row.appendChild(channelCell);

    programs.forEach((program, index) => {
      const absoluteSlot = state.windowStartSlot + index;
      const cell = document.createElement("div");
      cell.className = "program-cell";
      cell.dataset.channelId = channel.id;
      cell.tabIndex = 0;
      cell.setAttribute("role", "button");
      if (absoluteSlot === nowSlot) cell.classList.add("current");
      if (absoluteSlot === nowSlot && channel.id === state.tunedChannelId) cell.classList.add("tuned");

      let progressHtml = "";
      if (absoluteSlot === nowSlot) {
        const pct = clamp(((simulatedMinutes() - program.startMinute) / SLOT_MINUTES) * 100, 0, 100);
        progressHtml = `<div class="program-progress"><span style="width:${pct}%"></span></div>`;
      }
      cell.innerHTML = `<div class="program-title">${program.show}</div><div class="program-episode">${program.episode}</div><div class="program-time">${formatMinute(program.startMinute)}–${formatMinute(program.endMinute)}</div>${progressHtml}`;
      row.appendChild(cell);
    });

    els.guideRows.appendChild(row);
  }

  els.emptyState.classList.toggle("hidden", visibleRows !== 0);
}

function renderCrt() {
  document.body.classList.toggle("crt", state.crt);
  els.crtButton.textContent = `CRT: ${state.crt ? "On" : "Off"}`;
}

function renderAll() {
  els.dateInput.value = state.selectedDate;
  renderCrt();
  renderPlayer();
  renderGuide();
}

function tune(channelId, flash = true) {
  if (!CHANNELS.some(channel => channel.id === channelId)) return;
  state.tunedChannelId = channelId;
  persist();
  if (flash) {
    const channel = tunedChannel();
    els.tuneOverlay.textContent = `${channel.number}`;
    els.tuneOverlay.classList.remove("hidden");
    clearTimeout(tune._timer);
    tune._timer = setTimeout(() => els.tuneOverlay.classList.add("hidden"), 520);
  }
  renderPlayer();
  renderGuide();
}

function surf(direction) {
  const index = CHANNELS.findIndex(channel => channel.id === state.tunedChannelId);
  const nextIndex = (index + direction + CHANNELS.length) % CHANNELS.length;
  tune(CHANNELS[nextIndex].id);
}

function jumpGuideToNow() {
  state.windowStartSlot = clamp(Math.floor(simulatedMinutes() / SLOT_MINUTES) - 1, 0, 48 - GUIDE_SLOTS);
  renderGuide();
}

function openChannelModal(channelId) {
  const channel = CHANNELS.find(item => item.id === channelId);
  if (!channel) return;
  state.modalChannelId = channelId;
  els.modalName.textContent = channel.name;
  els.modalDescription.textContent = channel.description;
  els.eraSelect.innerHTML = "";
  Object.keys(channel.eras).sort().forEach(eraKey => {
    const option = document.createElement("option");
    option.value = eraKey;
    option.textContent = eraKey;
    option.selected = eraKey === state.eraByChannel[channelId];
    els.eraSelect.appendChild(option);
  });
  els.channelModal.classList.remove("hidden");
}

function closeChannelModal() { els.channelModal.classList.add("hidden"); state.modalChannelId = null; }

els.previous.addEventListener("click", () => surf(-1));
els.next.addEventListener("click", () => surf(1));
els.favorite.addEventListener("click", () => {
  const id = state.tunedChannelId;
  if (state.favorites.has(id)) state.favorites.delete(id); else state.favorites.add(id);
  persist(); renderAll();
});
els.crtButton.addEventListener("click", () => { state.crt = !state.crt; persist(); renderCrt(); });
els.searchInput.addEventListener("input", event => { state.search = event.target.value; renderGuide(); });
els.today.addEventListener("click", () => { state.selectedDate = todayKey(); state.scheduleCache.clear(); persist(); jumpGuideToNow(); renderAll(); });
els.dateInput.addEventListener("change", event => {
  if (!event.target.value) return;
  state.selectedDate = event.target.value;
  state.scheduleCache.clear();
  persist();
  jumpGuideToNow();
  renderAll();
});
els.earlier.addEventListener("click", () => { state.windowStartSlot = clamp(state.windowStartSlot - 3, 0, 48 - GUIDE_SLOTS); renderGuide(); });
els.later.addEventListener("click", () => { state.windowStartSlot = clamp(state.windowStartSlot + 3, 0, 48 - GUIDE_SLOTS); renderGuide(); });
els.jumpNow.addEventListener("click", jumpGuideToNow);
els.closeModal.addEventListener("click", closeChannelModal);
els.channelModal.addEventListener("click", event => { if (event.target === els.channelModal) closeChannelModal(); });
els.eraSelect.addEventListener("change", event => {
  if (!state.modalChannelId) return;
  state.eraByChannel[state.modalChannelId] = event.target.value;
  state.scheduleCache.clear();
  persist();
  renderAll();
});
els.guideRows.addEventListener("click", event => {
  const channelButton = event.target.closest(".channel-cell");
  if (channelButton) { openChannelModal(channelButton.dataset.channelId); return; }
  const programCell = event.target.closest(".program-cell");
  if (programCell) tune(programCell.dataset.channelId);
});
els.guideRows.addEventListener("keydown", event => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const programCell = event.target.closest(".program-cell");
  if (programCell) { event.preventDefault(); tune(programCell.dataset.channelId); }
});
els.home.addEventListener("click", () => { state.search = ""; els.searchInput.value = ""; jumpGuideToNow(); renderAll(); window.scrollTo({ top: 0, behavior: "smooth" }); });
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeChannelModal();
  if (event.target.matches("input, select")) return;
  if (event.key === "ArrowUp") surf(-1);
  if (event.key === "ArrowDown") surf(1);
});

jumpGuideToNow();
renderAll();

setInterval(() => {
  renderPlayer();
  renderGuide();
}, 60_000);
