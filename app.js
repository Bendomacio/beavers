/* ===== BeaverSpotter app logic ===== */

// --- Map setup -------------------------------------------------------------
const map = L.map("map", {
  center: [54.5, -3.4], // roughly centre of Great Britain
  zoom: 6,
  zoomControl: true,
  minZoom: 5,
  maxZoom: 16,
  worldCopyJump: true,
});

// Friendly, low-key basemap (CARTO Voyager — free, no key)
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a> · Beaver data illustrative',
    maxZoom: 19,
  }
).addTo(map);

// --- Heatmap layer ---------------------------------------------------------
// Weight each point by beaver count so busy sites glow hotter.
const maxBeavers = Math.max(...BEAVER_SITES.map((s) => s.beavers));
const heatPoints = BEAVER_SITES.map((s) => [
  s.lat,
  s.lng,
  s.beavers / maxBeavers,
]);

const heat = L.heatLayer(heatPoints, {
  radius: 38,
  blur: 28,
  maxZoom: 11,
  minOpacity: 0.35,
  gradient: {
    0.0: "#2bb3c0",
    0.4: "#6dc36d",
    0.7: "#ffd166",
    1.0: "#ff7b54",
  },
}).addTo(map);

// --- Markers ---------------------------------------------------------------
const markersById = {};

function makeIcon(site) {
  const cls = site.wild ? "beaver-marker wild" : "beaver-marker";
  return L.divIcon({
    className: "",
    html: `<div class="${cls}"><span class="pulse"></span>🦫</div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -16],
  });
}

BEAVER_SITES.forEach((site, i) => {
  const marker = L.marker([site.lat, site.lng], { icon: makeIcon(site) }).addTo(
    map
  );
  marker.bindPopup(
    `<div class="popup-title">🦫 ${site.name}</div>
     <div class="popup-sub">${site.region} · ~${site.beavers} beavers</div>`
  );
  marker.on("click", () => showDetail(site));
  marker.on("mouseover", () => marker.openPopup());
  markersById[i] = { marker, site };
  site._id = i;
});

// --- Side panel ------------------------------------------------------------
const panel = document.getElementById("panel");
const panelContent = document.getElementById("panelContent");
const panelClose = document.getElementById("panelClose");

panelClose.addEventListener("click", () => panel.classList.add("tucked"));

function showDetail(site) {
  const badge = site.wild
    ? '<span class="badge wild">🌿 Wild population</span>'
    : '<span class="badge enclosed">🚧 Enclosed project</span>';

  panelContent.innerHTML = `
    <div class="detail">
      ${badge}
      <h2>${site.name}</h2>
      <div class="region">📍 ${site.region}</div>
      <div class="metrics">
        <div class="metric"><span class="m-num">${site.beavers}</span><span class="m-label">Beavers</span></div>
        <div class="metric"><span class="m-num">${site.dams}</span><span class="m-label">Dams</span></div>
      </div>
      <p class="blurb">${site.blurb}</p>
      <div class="info-row">🕔 Best chance: <b>&nbsp;${site.bestTime}</b></div>
      <div class="info-row">📅 Established: <b>&nbsp;${site.established}</b></div>
      <button class="fly-btn" id="flyBtn">✈️ Fly me there</button>
    </div>`;

  panel.classList.remove("tucked");

  document.getElementById("flyBtn").addEventListener("click", () => {
    map.flyTo([site.lat, site.lng], 13, { duration: 1.4 });
    markersById[site._id].marker.openPopup();
    burstConfetti();
  });
}

// --- Search ----------------------------------------------------------------
const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const suggestionsEl = document.getElementById("suggestions");
let activeIdx = -1;

function matches(q) {
  q = q.trim().toLowerCase();
  if (!q) return [];
  return BEAVER_SITES.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.region.toLowerCase().includes(q)
  ).slice(0, 6);
}

function renderSuggestions(list) {
  if (!list.length) {
    suggestionsEl.classList.remove("show");
    suggestionsEl.innerHTML = "";
    return;
  }
  suggestionsEl.innerHTML = list
    .map(
      (s, i) =>
        `<li data-id="${s._id}" class="${i === activeIdx ? "active" : ""}">
          <span>🦫 ${s.name}</span>
          <span class="s-region">${s.region}</span>
        </li>`
    )
    .join("");
  suggestionsEl.classList.add("show");

  suggestionsEl.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", () => {
      const site = BEAVER_SITES[+li.dataset.id];
      goToSite(site);
    });
  });
}

function goToSite(site) {
  suggestionsEl.classList.remove("show");
  input.value = site.name;
  map.flyTo([site.lat, site.lng], 12, { duration: 1.4 });
  markersById[site._id].marker.openPopup();
  showDetail(site);
}

input.addEventListener("input", () => {
  activeIdx = -1;
  renderSuggestions(matches(input.value));
});

input.addEventListener("keydown", (e) => {
  const list = matches(input.value);
  if (!list.length) return;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    activeIdx = (activeIdx + 1) % list.length;
    renderSuggestions(list);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    activeIdx = (activeIdx - 1 + list.length) % list.length;
    renderSuggestions(list);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const list = matches(input.value);
  if (!list.length) return;
  goToSite(list[activeIdx >= 0 ? activeIdx : 0]);
});

document.addEventListener("click", (e) => {
  if (!form.contains(e.target)) suggestionsEl.classList.remove("show");
});

// --- Header stat counters (animated count-up) ------------------------------
function countUp(el, target, dur = 1400) {
  const start = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function runStats() {
  countUp(document.getElementById("statBeavers"), TOTAL_BEAVERS);
  countUp(document.getElementById("statSites"), TOTAL_SITES);
  countUp(document.getElementById("statDams"), TOTAL_DAMS);
}

// --- Fun extras: drifting leaves + confetti --------------------------------
const LEAVES = ["🍃", "🌿", "🍂"];
function spawnLeaves() {
  setInterval(() => {
    if (document.hidden) return;
    const leaf = document.createElement("div");
    leaf.className = "leaf";
    leaf.textContent = LEAVES[Math.floor(Math.random() * LEAVES.length)];
    leaf.style.left = Math.random() * 100 + "vw";
    leaf.style.animationDuration = 6 + Math.random() * 8 + "s";
    leaf.style.fontSize = 0.9 + Math.random() * 1.2 + "rem";
    document.body.appendChild(leaf);
    setTimeout(() => leaf.remove(), 15000);
  }, 1400);
}

function burstConfetti() {
  const emojis = ["🦫", "💧", "🌿", "⭐"];
  for (let i = 0; i < 18; i++) {
    const c = document.createElement("div");
    c.className = "leaf";
    c.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    c.style.left = 50 + (Math.random() * 40 - 20) + "vw";
    c.style.top = "30vh";
    c.style.animationDuration = 2 + Math.random() * 2 + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }
}

// --- Boot ------------------------------------------------------------------
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("splash").classList.add("hide");
    runStats();
  }, 1500);
  spawnLeaves();
});
