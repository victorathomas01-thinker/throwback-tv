// THROWBACK TV GUIDE
// Architecture: Data -> State -> Schedule Generator -> Render -> Events

// SETTINGS

const appSettings = {
    blockStartHour: new Date().getHours(), // demo starts at the current hour so Now Playing always works
    slotMinutes: 30,
    numberOfSlots: 4
};

// DATA

const channels = [
    {
        id: "jetix",
        name: "Jetix",
        description: "Action-heavy programming built around martial arts, anime, heroes, monsters, and adventure shows.",
        selectedEra: "2006",
        eras: {
            "2005": {
                label: "2005",
                shows: [
                    {
                        title: "Power Rangers SPD",
                        category: "action",
                        episodes: ["Beginnings Part 1", "Beginnings Part 2", "Confronted", "Walls", "Dogged"]
                    },
                    {
                        title: "Super Robot Monkey Team",
                        category: "action",
                        episodes: ["Chiro's Girl", "Depths of Fear", "Planetoid Q", "Magnetic Menace"]
                    },
                    {
                        title: "Digimon Frontier",
                        category: "anime",
                        episodes: ["All Aboard", "Lobomon", "Kumamon Baby, Light My Fire"]
                    },
                    {
                        title: "Get Ed",
                        category: "action",
                        episodes: ["The Tiki", "Omnis", "Mister Fix-It"]
                    }
                ]
            },
            "2006": {
                label: "2006",
                shows: [
                    {
                        title: "Power Rangers SPD",
                        category: "action",
                        episodes: ["Beginnings Part 1", "Beginnings Part 2", "Shadow Part 1", "Shadow Part 2", "Endings Part 1"]
                    },
                    {
                        title: "Yin Yang Yo!",
                        category: "action-comedy",
                        episodes: ["Dojo Alone", "Woo Foo Flu", "The Trouble with Two-ni-corns"]
                    },
                    {
                        title: "Pucca",
                        category: "comedy",
                        episodes: ["Funny Love", "Dance Pucca Dance", "Cat Toy"]
                    },
                    {
                        title: "Super Robot Monkey Team",
                        category: "action",
                        episodes: ["Skeleton King", "Thingy", "Wonder Fun Meat World"]
                    }
                ]
            }
        }
    },
    {
        id: "disney",
        name: "Disney Channel",
        description: "Sitcoms, animated hits, original movies, and after-school comfort programming.",
        selectedEra: "2004",
        eras: {
            "2003": {
                label: "2003",
                shows: [
                    {
                        title: "Kim Possible",
                        category: "animation",
                        episodes: ["Crush", "Sink or Swim", "The New Ron", "Bueno Nacho"]
                    },
                    {
                        title: "That's So Raven",
                        category: "sitcom",
                        episodes: ["Mother Dearest", "A Fish Called Raven", "Wake Up Victor"]
                    },
                    {
                        title: "Lizzie McGuire",
                        category: "sitcom",
                        episodes: ["Rumors", "Picture Day", "Between a Rock and a Bra Place"]
                    }
                ]
            },
            "2004": {
                label: "2004",
                shows: [
                    {
                        title: "Kim Possible",
                        category: "animation",
                        episodes: ["Car Trouble", "Rufus in Show", "Adventures in Rufus-Sitting"]
                    },
                    {
                        title: "That's So Raven",
                        category: "sitcom",
                        episodes: ["Out of Control", "Don't Have a Cow", "Run Raven Run"]
                    },
                    {
                        title: "The Proud Family",
                        category: "animation",
                        episodes: ["Bring It On", "Hooray for Iesha", "She Drives Me Crazy"]
                    }
                ]
            }
        }
    },
    {
        id: "toon-disney",
        name: "Toon Disney",
        description: "Disney animation, classic reruns, weekday cartoon blocks, and comfort shows.",
        selectedEra: "2002",
        eras: {
            "2002": {
                label: "2002",
                shows: [
                    {
                        title: "House of Mouse",
                        category: "animation",
                        episodes: ["The Stolen Cartoons", "Big Bad Wolf Daddy", "Donald's Pumbaa Prank"]
                    },
                    {
                        title: "Recess",
                        category: "animation",
                        episodes: ["The Break In", "The New Kid", "Parents' Night"]
                    },
                    {
                        title: "Lloyd in Space",
                        category: "animation",
                        episodes: ["The Big Sleepover", "Double Date", "The Thrilla at Intrepidvilla"]
                    }
                ]
            }
        }
    }
];

// STATE

const state = {
    selectedChannelId: null,
    currentSchedule: [],
    searchQuery: ""
};

// TIME HELPERS

function minutesToTimeString(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60) % 24;
    const minutes = totalMinutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function timeToMinutes(timeString) {
    const parts = timeString.split(":");
    return Number(parts[0]) * 60 + Number(parts[1]);
}

function formatTime(timeString) {
    let [hourString, minuteString] = timeString.split(":");
    let hour = Number(hourString);
    const suffix = hour >= 12 ? "PM" : "AM";

    if (hour === 0) {
        hour = 12;
    } else if (hour > 12) {
        hour -= 12;
    }

    return `${hour}:${minuteString} ${suffix}`;
}

function getCurrentMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

// SCHEDULE GENERATION

function getActiveEra(channel) {
    return channel.eras[channel.selectedEra];
}

function pickShowForSlot(shows, slotIndex) {
    // Simple deterministic rotation for now.
    // Later this can become weighted by category, day of week, holidays, etc.
    return shows[slotIndex % shows.length];
}

function pickEpisodeForShow(show, slotIndex, channelIndex) {
    // Deterministic episode cycling without saving progress yet.
    const episodeIndex = (slotIndex + channelIndex) % show.episodes.length;
    return show.episodes[episodeIndex];
}

function generateSchedule() {
    const generated = [];
    const startMinutes = appSettings.blockStartHour * 60;

    for (let channelIndex = 0; channelIndex < channels.length; channelIndex++) {
        const channel = channels[channelIndex];
        const era = getActiveEra(channel);
        const row = {
            channelId: channel.id,
            channelName: channel.name,
            eraLabel: era.label,
            programs: []
        };

        for (let slotIndex = 0; slotIndex < appSettings.numberOfSlots; slotIndex++) {
            const slotStart = startMinutes + slotIndex * appSettings.slotMinutes;
            const slotEnd = slotStart + appSettings.slotMinutes;

            const show = pickShowForSlot(era.shows, slotIndex);
            const episode = pickEpisodeForShow(show, slotIndex, channelIndex);

            row.programs.push({
                start: minutesToTimeString(slotStart),
                end: minutesToTimeString(slotEnd),
                show: show.title,
                episode: episode,
                category: show.category
            });
        }

        generated.push(row);
    }

    return generated;
}

function getCurrentProgramFromSchedule() {
    const currentMinutes = getCurrentMinutes();

    for (let rowIndex = 0; rowIndex < state.currentSchedule.length; rowIndex++) {
        const row = state.currentSchedule[rowIndex];

        for (let programIndex = 0; programIndex < row.programs.length; programIndex++) {
            const program = row.programs[programIndex];
            const startMinutes = timeToMinutes(program.start);
            const endMinutes = timeToMinutes(program.end);

            if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
                return {
                    channelName: row.channelName,
                    eraLabel: row.eraLabel,
                    program: program
                };
            }
        }
    }

    return null;
}

function getMinutesRemaining(program) {
    return timeToMinutes(program.end) - getCurrentMinutes();
}

// UI REFERENCES

const timeHeader = document.getElementById("timeHeader");
const guideGrid = document.getElementById("guideGrid");

const nowTitle = document.getElementById("nowTitle");
const nowEpisode = document.getElementById("nowEpisode");
const nowMeta = document.getElementById("nowMeta");
const nowRemaining = document.getElementById("nowRemaining");

const channelPanel = document.getElementById("channelPanel");
const closePanelButton = document.getElementById("closePanelButton");
const panelChannelName = document.getElementById("panelChannelName");
const panelDescription = document.getElementById("panelDescription");
const eraSelect = document.getElementById("eraSelect");

const cleanModeButton = document.getElementById("cleanModeButton");
const crtModeButton = document.getElementById("crtModeButton");
const refreshButton = document.getElementById("refreshButton");
const searchInput = document.getElementById("searchInput");

// RENDER

function renderTimeHeader() {
    timeHeader.innerHTML = "";

    const emptyCell = document.createElement("div");
    emptyCell.className = "time-cell";
    emptyCell.textContent = "CHANNEL";
    timeHeader.appendChild(emptyCell);

    const startMinutes = appSettings.blockStartHour * 60;

    for (let i = 0; i < appSettings.numberOfSlots; i++) {
        const cell = document.createElement("div");
        cell.className = "time-cell";

        const time = minutesToTimeString(startMinutes + i * appSettings.slotMinutes);
        cell.textContent = i === 0 ? `NOW - ${formatTime(time)}` : formatTime(time);

        timeHeader.appendChild(cell);
    }
}

function renderGuide() {
    guideGrid.innerHTML = "";

    const current = getCurrentProgramFromSchedule();

    for (let rowIndex = 0; rowIndex < state.currentSchedule.length; rowIndex++) {
        const rowData = state.currentSchedule[rowIndex];

        const normalizedQuery = state.searchQuery.trim().toLowerCase();
        const channelMatches = rowData.channelName.toLowerCase().includes(normalizedQuery);
        const programMatches = rowData.programs.some(function(program) {
            return program.show.toLowerCase().includes(normalizedQuery) ||
                program.episode.toLowerCase().includes(normalizedQuery) ||
                program.category.toLowerCase().includes(normalizedQuery);
        });

        if (normalizedQuery && !channelMatches && !programMatches) {
            continue;
        }

        const row = document.createElement("div");
        row.className = "channel-row";

        const channelCell = document.createElement("div");
        channelCell.className = "channel-cell";
        channelCell.dataset.channelId = rowData.channelId;

        channelCell.innerHTML = `
            <div class="channel-name">${rowData.channelName}</div>
            <div class="channel-era">${rowData.eraLabel}</div>
        `;

        row.appendChild(channelCell);

        for (let programIndex = 0; programIndex < rowData.programs.length; programIndex++) {
            const program = rowData.programs[programIndex];
            const programCell = document.createElement("div");
            programCell.className = "program-cell";

            if (
                current !== null &&
                current.channelName === rowData.channelName &&
                current.program === program
            ) {
                programCell.className = "program-cell active";
            }

            programCell.innerHTML = `
                <div class="program-title">${program.show}</div>
                <div class="program-episode">${program.episode}</div>
                <div class="program-time">${formatTime(program.start)} - ${formatTime(program.end)}</div>
            `;

            row.appendChild(programCell);
        }

        guideGrid.appendChild(row);
    }
}

function renderNowPlaying() {
    const current = getCurrentProgramFromSchedule();

    if (current === null) {
        nowTitle.textContent = "Nothing scheduled right now";
        nowEpisode.textContent = "";
        nowMeta.textContent = "Try changing the demo block start hour in script.js.";
        nowRemaining.textContent = "";
        return;
    }

    const minutesRemaining = getMinutesRemaining(current.program);

    nowTitle.textContent = `${current.channelName}: ${current.program.show}`;
    nowEpisode.textContent = current.program.episode;
    nowMeta.textContent = `${formatTime(current.program.start)} - ${formatTime(current.program.end)} • ${current.eraLabel}`;
    nowRemaining.textContent = `${minutesRemaining} minutes remaining`;
}

function render() {
    state.currentSchedule = generateSchedule();

    renderTimeHeader();
    renderGuide();
    renderNowPlaying();
}

// CHANNEL PANEL

function openChannelPanel(channelId) {
    const channel = channels.find(function(item) {
        return item.id === channelId;
    });

    if (!channel) {
        return;
    }

    state.selectedChannelId = channelId;

    panelChannelName.textContent = channel.name;
    panelDescription.textContent = channel.description;

    eraSelect.innerHTML = "";

    const eraKeys = Object.keys(channel.eras);

    for (let i = 0; i < eraKeys.length; i++) {
        const eraKey = eraKeys[i];
        const option = document.createElement("option");

        option.value = eraKey;
        option.textContent = channel.eras[eraKey].label;

        if (eraKey === channel.selectedEra) {
            option.selected = true;
        }

        eraSelect.appendChild(option);
    }

    channelPanel.classList.remove("hidden");
}

function closeChannelPanel() {
    channelPanel.classList.add("hidden");
}

// EVENTS

guideGrid.addEventListener("click", function(event) {
    const channelCell = event.target.closest(".channel-cell");

    if (!channelCell) {
        return;
    }

    openChannelPanel(channelCell.dataset.channelId);
});

closePanelButton.addEventListener("click", closeChannelPanel);

eraSelect.addEventListener("change", function() {
    const channel = channels.find(function(item) {
        return item.id === state.selectedChannelId;
    });

    if (!channel) {
        return;
    }

    channel.selectedEra = eraSelect.value;
    render();
});

cleanModeButton.addEventListener("click", function() {
    document.body.classList.remove("crt");
});

crtModeButton.addEventListener("click", function() {
    document.body.classList.add("crt");
});

refreshButton.addEventListener("click", render);

searchInput.addEventListener("input", function() {
    state.searchQuery = searchInput.value;
    renderGuide();
});

// START APP

render();

setInterval(render, 60000);
