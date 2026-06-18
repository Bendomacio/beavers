// UK Beaver hotspots — based on real reintroduction projects and known wild populations.
// Counts are approximate / illustrative estimates drawn from public project reporting.
const BEAVER_SITES = [
  {
    name: "River Otter",
    region: "Devon, England",
    lat: 50.7236,
    lng: -3.2861,
    beavers: 60,
    dams: 28,
    blurb:
      "Home of the famous River Otter Beaver Trial — the first legally sanctioned wild beaver population in England. Dawn and dusk walks along the riverbank near Otterton give a real chance of a sighting.",
    bestTime: "Dusk, spring & summer",
    established: 2015,
    wild: true,
  },
  {
    name: "Knapdale Forest",
    region: "Argyll, Scotland",
    lat: 55.9000,
    lng: -5.5333,
    beavers: 40,
    dams: 15,
    blurb:
      "The Scottish Beaver Trial site — Britain's first official reintroduction. A network of lochs and lochans with waymarked trails and a dedicated beaver-watching hide.",
    bestTime: "Dusk, May–September",
    established: 2009,
    wild: true,
  },
  {
    name: "Tayside (River Tay)",
    region: "Perthshire, Scotland",
    lat: 56.5500,
    lng: -3.4000,
    beavers: 400,
    dams: 120,
    blurb:
      "The largest free-living beaver population in Britain, spread across the Tay and Earn catchments. Strathallan and the lower Tay tributaries are reliable hotspots.",
    bestTime: "Dusk all year",
    established: 2006,
    wild: true,
  },
  {
    name: "Cornwall Beaver Project",
    region: "Ladock, Cornwall",
    lat: 50.3170,
    lng: -4.9800,
    beavers: 8,
    dams: 12,
    blurb:
      "An enclosed flagship project at Woodland Valley Farm demonstrating natural flood management. Guided evening tours offer near-guaranteed sightings.",
    bestTime: "Guided dusk tours",
    established: 2017,
    wild: false,
  },
  {
    name: "Forest of Dean",
    region: "Gloucestershire, England",
    lat: 51.8000,
    lng: -2.5500,
    beavers: 10,
    dams: 9,
    blurb:
      "An enclosed beaver project near Lydbrook helping slow flood water reaching the village of Lydbrook downstream. Viewing platform on the public trail.",
    bestTime: "Dusk, spring",
    established: 2018,
    wild: false,
  },
  {
    name: "Cropton Forest",
    region: "North Yorkshire, England",
    lat: 54.3000,
    lng: -0.8000,
    beavers: 12,
    dams: 14,
    blurb:
      "Forestry England's enclosed beavers in the North York Moors, reducing flood risk to the village of Sinnington. Trails wind through the surrounding pine forest.",
    bestTime: "Dusk, summer",
    established: 2019,
    wild: false,
  },
  {
    name: "Spains Hall Estate",
    region: "Finchingfield, Essex",
    lat: 51.9670,
    lng: 0.4500,
    beavers: 9,
    dams: 11,
    blurb:
      "A pioneering natural flood management enclosure where beaver dams protect the village of Finchingfield. Estate open days include beaver talks.",
    bestTime: "Dusk, late spring",
    established: 2019,
    wild: false,
  },
  {
    name: "Ham Fen",
    region: "Kent, England",
    lat: 51.2500,
    lng: 1.3300,
    beavers: 6,
    dams: 7,
    blurb:
      "Kent Wildlife Trust's beavers restoring one of the last remaining fragments of ancient fenland in the county. A quiet, atmospheric wetland reserve.",
    bestTime: "Dusk, summer",
    established: 2002,
    wild: false,
  },
  {
    name: "Bamff Estate",
    region: "Alyth, Perthshire",
    lat: 56.6400,
    lng: -3.1700,
    beavers: 20,
    dams: 18,
    blurb:
      "One of the longest-running beaver sites in Scotland, with a rich mosaic of dams and ponds. Self-guided beaver walks and 'beaver safari' stays available.",
    bestTime: "Dusk all year",
    established: 2002,
    wild: false,
  },
  {
    name: "River Avon (Wiltshire)",
    region: "Wiltshire, England",
    lat: 51.3500,
    lng: -1.9800,
    beavers: 7,
    dams: 6,
    blurb:
      "An emerging enclosed project on a chalk-stream tributary, restoring wetland habitat and demonstrating water-quality benefits.",
    bestTime: "Dusk, spring",
    established: 2021,
    wild: false,
  },
  {
    name: "Willington Wetlands",
    region: "Derbyshire, England",
    lat: 52.8600,
    lng: -1.5600,
    beavers: 5,
    dams: 4,
    blurb:
      "Derbyshire Wildlife Trust beavers brought back to the Trent valley after 800 years, kick-starting wetland restoration on former gravel pits.",
    bestTime: "Dusk, summer",
    established: 2021,
    wild: false,
  },
  {
    name: "Loch of the Lowes",
    region: "Dunkeld, Perthshire",
    lat: 56.5800,
    lng: -3.5600,
    beavers: 15,
    dams: 10,
    blurb:
      "A Scottish Wildlife Trust reserve where wild Tayside beavers can be watched from hides alongside ospreys and red squirrels.",
    bestTime: "Dusk, spring & summer",
    established: 2010,
    wild: true,
  },
];

// Quick lookup-friendly totals
const TOTAL_BEAVERS = BEAVER_SITES.reduce((s, x) => s + x.beavers, 0);
const TOTAL_DAMS = BEAVER_SITES.reduce((s, x) => s + x.dams, 0);
const TOTAL_SITES = BEAVER_SITES.length;
