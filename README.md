# 🦫 BeaverSpotter

A friendly, animated map of the UK's beaver hotspots — find existing dams and
work out where you've got the best chance of actually spotting a beaver.

I love beavers & turtles

## Features

- **Interactive UK map** with a **heatmap** showing beaver density across known sites.
- **Search** any place (e.g. *Devon*, *Tay*, *Kent*) with live suggestions and keyboard navigation.
- **Smooth zoom & pan controls** plus a "Fly me there" button for each hotspot.
- **Info panel** for every location: number of beavers, dams, best time to visit,
  whether it's a wild or enclosed population, and a short guide.
- **Animated beaver logo** (hand-built SVG) with blinking eyes and a wagging tail,
  drifting leaves, pulsing markers, count-up stats and confetti. Lots of fancy animations. ✨

## Run it

No build step — it's plain HTML/CSS/JS. Just open `index.html` in a browser
(needs internet access for the map tiles).

```
beavers/
├── index.html   # page + animated SVG logo
├── styles.css   # theme + all the animations
├── app.js       # map, heatmap, search, panel logic
└── data.js      # UK beaver site data
```

## Data note

Locations are based on real UK beaver reintroduction projects and known wild
populations (River Otter, Tayside, Knapdale, Cornwall, etc.). Beaver/dam counts
are **approximate, illustrative estimates** for demonstration — always check with
the relevant wildlife trust before planning a visit.
