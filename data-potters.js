// Pottersmith Survivor 50 — Potter group fantasy pool
// FINAL season data — sourced from the workbook's Placements sheet
window.SURVIVOR_DATA = {
  meta: {
    title: "Pottersmith Survivor 50",
    subtitle: "Season 50",
    updated: "May 21, 2026",
    currentEpisode: 13,
    totalEpisodes: 13,
    seasonComplete: true,
    soleSurvivor: { name: "Aubry Bracco", team: "lottie" },
    poolChampion: "lottie",
    titleLines: ["POTTERSMITH", "SURVIVOR", "SEASON FIFTY"],
    kicker: "FANTASY POOL · THE POTTERS",
    championKicker: "SEASON 50 · CHAMPION CROWNED",
  },
  teams: [
    { id: "lottie", coach: "Lottie Smith",      short: "Lottie", fullKey: "Lottie Smith",      color: "#3F8F4A", buff: "Jungle Green" },
    { id: "chris",  coach: "Christopher Smith", short: "Chris",  fullKey: "Christopher Smith", color: "#D9531A", buff: "Tiki Orange" },
    { id: "jordan", coach: "Jordan Potter",     short: "Jordan", fullKey: "Jordan Potter",     color: "#5D6FB0", buff: "Ocean Blue" },
    { id: "corn",   coach: "Corn HoleSanders",  short: "Corn",   fullKey: "Corn HoleSanders",  color: "#C29A2C", buff: "Sun Gold" },
  ],
  // From Placements sheet — placement, episode out, team
  players: [
    // Jordan Potter
    { name: "Charlie Davis",        team: "jordan", placement: 18, ep: 5  },
    { name: "Joe Hunter",           team: "jordan", placement: 3,  ep: 13 },
    { name: "Christian Hubicki",    team: "jordan", placement: 11, ep: 9  },
    { name: "Savannah Louie",       team: "jordan", placement: 22, ep: 2  },
    { name: "Stephenie LaGrossa",   team: "jordan", placement: 10, ep: 10 },
    // Lottie Smith
    { name: "Colby Donaldson",      team: "lottie", placement: 15, ep: 6  },
    { name: "Oscar Lusth",          team: "lottie", placement: 8,  ep: 11 },
    { name: "Aubry Bracco",         team: "lottie", placement: 1,  ep: 13 },
    { name: "Mike White",           team: "lottie", placement: 20, ep: 4  },
    { name: "Tiffany Ervin",        team: "lottie", placement: 5,  ep: 13 },
    // Corn HoleSanders
    { name: "Genevieve Mushaluk",   team: "corn",   placement: 15, ep: 6  },
    { name: "Kamilla Karthigesu",   team: "corn",   placement: 15, ep: 6  },
    { name: "Quintavius Burdette",  team: "corn",   placement: 21, ep: 3  },
    { name: "Rick Devens",          team: "corn",   placement: 7,  ep: 12 },
    { name: "Benjamin Wade",        team: "corn",   placement: 12, ep: 8  },
    // Christopher Smith
    { name: "Jonathan Young",       team: "chris",  placement: 2,  ep: 13 },
    { name: "Angelina Keeley",      team: "chris",  placement: 18, ep: 5  },
    { name: "Cirie Fields",         team: "chris",  placement: 6,  ep: 12 },
    { name: "Rizo Velovic",         team: "chris",  placement: 4,  ep: 13 },
    { name: "Dianelys Valladares",  team: "chris",  placement: 14, ep: 7  },
  ],
  // Final aggregated points from the Scores sheet
  // episode = top3/winner bonuses included in player; snitch = sole-survivor bonus
  scores: {
    lottie: { player: 96, episode: 0, snitch: 25, total: 121 },
    chris:  { player: 91, episode: 0, snitch: 0,  total: 91  },
    jordan: { player: 71, episode: 0, snitch: 0,  total: 71  },
    corn:   { player: 55, episode: 0, snitch: 0,  total: 55  },
  },
  // Cumulative team points by episode (snitch +25 to Lottie applied at season close)
  trajectory: [
    { ep: 1,  chris: 0,  lottie: 0,   jordan: 0,  corn: 0  },
    { ep: 2,  chris: 0,  lottie: 0,   jordan: 3,  corn: 0  },
    { ep: 3,  chris: 0,  lottie: 0,   jordan: 3,  corn: 4  },
    { ep: 4,  chris: 0,  lottie: 5,   jordan: 3,  corn: 4  },
    { ep: 5,  chris: 7,  lottie: 5,   jordan: 10, corn: 4  },
    { ep: 6,  chris: 7,  lottie: 15,  jordan: 10, corn: 24 },
    { ep: 7,  chris: 18, lottie: 15,  jordan: 10, corn: 24 },
    { ep: 8,  chris: 18, lottie: 15,  jordan: 10, corn: 37 },
    { ep: 9,  chris: 18, lottie: 15,  jordan: 24, corn: 37 },
    { ep: 10, chris: 18, lottie: 15,  jordan: 39, corn: 37 },
    { ep: 11, chris: 18, lottie: 32,  jordan: 39, corn: 37 },
    { ep: 12, chris: 37, lottie: 32,  jordan: 39, corn: 55 },
    { ep: 13, chris: 91, lottie: 121, jordan: 71, corn: 55 },
  ],
  // Golden Snitch (Sole Survivor) picks — Lottie nailed it
  snitch: [
    { team: "lottie", pick: "Aubry Bracco",   status: "alive" },
    { team: "chris",  pick: "Jonathan Young", status: "out"   },
    { team: "jordan", pick: "Charlie Davis",  status: "out"   },
    { team: "corn",   pick: "Rick Devens",    status: "out"   },
  ],
  // No per-episode boot predictions tracked for this pool
  predictions: [],
  // Final Power Rankings — straight from the Dashboard sheet
  power: {
    lottie: { banked: 121, remaining: 0, maxPlayer: 0, epsLeft: 0, snitch: 25, potential: 0, score: 121, rank: 1 },
    chris:  { banked: 91,  remaining: 0, maxPlayer: 0, epsLeft: 0, snitch: 0,  potential: 0, score: 91,  rank: 2 },
    jordan: { banked: 71,  remaining: 0, maxPlayer: 0, epsLeft: 0, snitch: 0,  potential: 0, score: 71,  rank: 3 },
    corn:   { banked: 55,  remaining: 0, maxPlayer: 0, epsLeft: 0, snitch: 0,  potential: 0, score: 55,  rank: 4 },
  },
};
