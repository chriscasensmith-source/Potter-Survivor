/* Smirtings Survivor Extravaganza — dashboard components */

const { useState, useMemo, useEffect, useRef } = React;

// ============ helpers ============
const D = window.SURVIVOR_DATA;
const teamById = (id) => D.teams.find(t => t.id === id);
const teamByKey = (key) => D.teams.find(t => t.fullKey === key);

// ============ Champion Banner ============
function ChampionBanner() {
  if (!D.meta.seasonComplete) return null;
  const champ = teamById(D.meta.poolChampion);
  const champScore = D.scores[D.meta.poolChampion].total;
  const ss = D.meta.soleSurvivor;
  const ssTeam = teamById(ss.team);
  return (
    <section className="ssx-champ" style={{"--champ-color": champ.color}}>
      <div className="ssx-champ__rays" aria-hidden="true"></div>
      <div className="ssx-champ__inner">
        <div className="ssx-champ__corner ssx-champ__corner--tl"></div>
        <div className="ssx-champ__corner ssx-champ__corner--tr"></div>
        <div className="ssx-champ__corner ssx-champ__corner--bl"></div>
        <div className="ssx-champ__corner ssx-champ__corner--br"></div>

        <div className="ssx-champ__crest" aria-hidden="true">
          <svg viewBox="0 0 80 80" width="64" height="64">
            <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="40" cy="40" r="28" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            <path d="M40 14 L46 30 L62 30 L50 40 L54 56 L40 46 L26 56 L30 40 L18 30 L34 30 Z" fill="currentColor"/>
          </svg>
        </div>

        <div className="ssx-champ__kicker">{D.meta.championKicker || "SEASON TWO · CHAMPION CROWNED"}</div>
        <div className="ssx-champ__title">POOL CHAMPION</div>
        <div className="ssx-champ__name">{champ.coach.toUpperCase()}</div>
        <div className="ssx-champ__score">
          <span className="ssx-champ__score-num">{champScore}</span>
          <span className="ssx-champ__score-lbl">FINAL POINTS</span>
        </div>
        <div className="ssx-champ__buff">{champ.buff.toUpperCase()} TRIBE · {D.players.filter(p => p.team === champ.id).length}-CASTAWAY ROSTER</div>

        <div className="ssx-champ__divider">
          <span></span><span>◆</span><span></span>
        </div>

        <div className="ssx-champ__survivor">
          <div className="ssx-champ__survivor-lbl">SOLE SURVIVOR</div>
          <div className="ssx-champ__survivor-name">{ss.name.toUpperCase()}</div>
          <div className="ssx-champ__survivor-chip" style={{borderColor: ssTeam.color, color: ssTeam.color}}>
            DRAFTED BY {ssTeam.coach.toUpperCase()}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ Header ============
function SurvivorHeader({ tweaks }) {
  const titleLines = D.meta.titleLines || ["SMIRTINGS", "SURVIVOR", "EXTRAVAGANZA"];
  const kicker = D.meta.kicker || "CASTAWAY FANTASY LEAGUE";
  return (
    <header className="ssx-header">
      <div className="ssx-header__torch ssx-torch" aria-hidden="true">
        <div className="ssx-torch__flame"></div>
        <div className="ssx-torch__flame ssx-torch__flame--inner"></div>
        <div className="ssx-torch__pole"></div>
      </div>
      <div className="ssx-header__center">
        <div className="ssx-header__kicker">SEASON {tweaks.seasonNumber} · {kicker}</div>
        <h1 className="ssx-header__title">
          <span className="ssx-header__title-1">{titleLines[0]}</span>
          <span className="ssx-header__title-2">{titleLines[1]}</span>
          <span className="ssx-header__title-3">{titleLines[2]}</span>
        </h1>
        <div className="ssx-header__meta">
          <span>EP {D.meta.currentEpisode} OF {D.meta.totalEpisodes}</span>
          <span className="ssx-header__sep">◆</span>
          <span>{D.players.filter(p => p.placement === null).length} CASTAWAYS REMAIN</span>
          <span className="ssx-header__sep">◆</span>
          <span>UPDATED {D.meta.updated.toUpperCase()}</span>
        </div>
      </div>
      <div className="ssx-header__torch ssx-torch ssx-torch--right" aria-hidden="true">
        <div className="ssx-torch__flame"></div>
        <div className="ssx-torch__flame ssx-torch__flame--inner"></div>
        <div className="ssx-torch__pole"></div>
      </div>
    </header>
  );
}

// ============ Season at a glance ============
function SeasonAtAGlance() {
  const aliveCount = D.players.filter(p => p.placement === null).length;
  const eliminatedCount = D.players.length - aliveCount;
  const progress = Math.round((D.meta.currentEpisode / D.meta.totalEpisodes) * 100);
  const sortedScores = [...D.teams].map(t => ({ ...t, total: D.scores[t.id].total })).sort((a,b) => b.total - a.total);
  const leader = sortedScores[0];
  const margin = sortedScores[0].total - sortedScores[1].total;

  const stats = [
    { label: "EPISODE", value: D.meta.currentEpisode, sub: `OF ${D.meta.totalEpisodes}` },
    { label: "PROGRESS", value: progress + "%", sub: "OF SEASON", isProgress: true, progress },
    { label: "CASTAWAYS LEFT", value: aliveCount, sub: `${eliminatedCount} VOTED OUT` },
    { label: "LEADER", value: leader.short.toUpperCase(), sub: margin === 0 ? "TIED AT TOP" : `+${margin} PT LEAD`, color: leader.color },
  ];
  return (
    <section className="ssx-glance">
      <div className="ssx-section-title">
        <div className="ssx-section-title__line"></div>
        <h2>SEASON AT A GLANCE</h2>
        <div className="ssx-section-title__line"></div>
      </div>
      <div className="ssx-glance__grid">
        {stats.map((s,i) => (
          <div key={i} className="ssx-stat-card">
            <div className="ssx-stat-card__notch ssx-stat-card__notch--tl"></div>
            <div className="ssx-stat-card__notch ssx-stat-card__notch--tr"></div>
            <div className="ssx-stat-card__notch ssx-stat-card__notch--bl"></div>
            <div className="ssx-stat-card__notch ssx-stat-card__notch--br"></div>
            <div className="ssx-stat-card__label">{s.label}</div>
            <div className="ssx-stat-card__value" style={s.color ? {color: s.color} : null}>{s.value}</div>
            <div className="ssx-stat-card__sub">{s.sub}</div>
            {s.isProgress && (
              <div className="ssx-stat-card__bar">
                <div className="ssx-stat-card__bar-fill" style={{width: s.progress + "%"}}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ============ Standings ============
function Standings() {
  const ranked = [...D.teams]
    .map(t => ({ ...t, ...D.scores[t.id] }))
    .sort((a,b) => b.total - a.total);
  const max = Math.max(...ranked.map(r => r.total));
  const medals = ["🥇 1ST", "🥈 2ND", "🥉 3RD", "4TH"];

  return (
    <section className="ssx-standings ssx-card">
      <div className="ssx-card__header">
        <div className="ssx-card__icon">
          <svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M5 3h14v3a5 5 0 0 1-4 4.9V13h2v2H7v-2h2v-2.1A5 5 0 0 1 5 6V3zm2 2v1a3 3 0 0 0 2 2.8V8h6v.8A3 3 0 0 0 17 6V5H7zm2 12h6v4H9v-4z"/></svg>
        </div>
        <h3>TRIBAL STANDINGS</h3>
        <div className="ssx-card__sub">POINTS LEADERBOARD</div>
      </div>
      <div className="ssx-standings__list">
        {ranked.map((r, i) => (
          <div key={r.id} className="ssx-standings__row" style={{"--team-color": r.color}}>
            <div className="ssx-standings__rank">{medals[i]}</div>
            <div className="ssx-standings__buff" style={{background: r.color}}>
              <div className="ssx-standings__buff-tag">BUFF</div>
            </div>
            <div className="ssx-standings__name">
              <div className="ssx-standings__coach">{r.coach}</div>
              <div className="ssx-standings__breakdown">
                {r.player} pts roster · {r.episode} pts predictions{r.snitch ? ` · ${r.snitch} snitch` : ""}
              </div>
            </div>
            <div className="ssx-standings__bar">
              <div className="ssx-standings__bar-fill" style={{width: (r.total/max*100) + "%", background: r.color}}>
                <div className="ssx-standings__bar-stripes"></div>
              </div>
            </div>
            <div className="ssx-standings__total">
              <div className="ssx-standings__total-num">{r.total}</div>
              <div className="ssx-standings__total-lbl">PTS</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============ Trajectory chart ============
function TrajectoryChart() {
  const W = 760, H = 320, P = { l: 44, r: 24, t: 24, b: 36 };
  const innerW = W - P.l - P.r, innerH = H - P.t - P.b;
  const maxY = Math.max(...D.trajectory.flatMap(d => D.teams.map(t => d[t.id] || 0))) * 1.15;
  const xs = D.trajectory.map(d => d.ep);
  const x = ep => P.l + ((ep-1) / (D.meta.totalEpisodes-1)) * innerW;
  const y = v => P.t + innerH - (v/maxY) * innerH;
  const [hover, setHover] = useState(null);

  const teamLines = D.teams.map(t => {
    const pts = D.trajectory.map(d => ({ ep: d.ep, v: d[t.id] }));
    const dStr = pts.map((p,i) => (i===0 ? "M" : "L") + x(p.ep) + " " + y(p.v)).join(" ");
    return { ...t, pts, d: dStr };
  });

  const yTicks = [0, Math.ceil(maxY/4), Math.ceil(maxY/2), Math.ceil(maxY*3/4), Math.ceil(maxY)].map(v => Math.round(v/5)*5);

  return (
    <section className="ssx-card ssx-trajectory">
      <div className="ssx-card__header">
        <div className="ssx-card__icon">
          <svg viewBox="0 0 24 24" width="22" height="22"><path fill="none" stroke="currentColor" strokeWidth="2.4" d="M3 17l5-6 4 3 4-7 5 4"/></svg>
        </div>
        <h3>SEASON TRAJECTORY</h3>
        <div className="ssx-card__sub">CUMULATIVE POINTS BY EPISODE</div>
      </div>
      <div className="ssx-trajectory__wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="ssx-trajectory__svg" onMouseLeave={() => setHover(null)}>
          {/* horizontal grid */}
          {yTicks.map((v,i) => (
            <g key={i}>
              <line x1={P.l} x2={W-P.r} y1={y(v)} y2={y(v)} stroke="var(--ssx-line-grid)" strokeDasharray="2 4"/>
              <text x={P.l-8} y={y(v)+4} textAnchor="end" className="ssx-trajectory__tick">{v}</text>
            </g>
          ))}
          {/* episode markers */}
          {Array.from({length: D.meta.totalEpisodes}, (_,i) => i+1).map(ep => (
            <g key={ep}>
              <line x1={x(ep)} x2={x(ep)} y1={P.t} y2={H-P.b} stroke="var(--ssx-line-grid)" opacity={ep <= D.meta.currentEpisode ? 0.5 : 0.2} strokeDasharray={ep > D.meta.currentEpisode ? "2 3" : "0"}/>
              <text x={x(ep)} y={H-P.b+18} textAnchor="middle" className="ssx-trajectory__tick">EP{ep}</text>
            </g>
          ))}
          {/* current episode marker */}
          <line x1={x(D.meta.currentEpisode)} x2={x(D.meta.currentEpisode)} y1={P.t} y2={H-P.b} stroke="var(--ssx-fire)" strokeWidth="1.5" opacity="0.6"/>
          <text x={x(D.meta.currentEpisode)} y={P.t-6} textAnchor="middle" className="ssx-trajectory__now">⟢ NOW</text>

          {/* lines */}
          {teamLines.map(t => (
            <g key={t.id}>
              <path d={t.d} fill="none" stroke={t.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity={hover && hover !== t.id ? 0.25 : 1}/>
              {t.pts.map(p => (
                <circle key={p.ep} cx={x(p.ep)} cy={y(p.v)} r="3.5" fill="var(--ssx-paper)" stroke={t.color} strokeWidth="2" opacity={hover && hover !== t.id ? 0.25 : 1}/>
              ))}
            </g>
          ))}

          {/* hover overlays */}
          {xs.map(ep => (
            <rect key={ep} x={x(ep) - innerW/(D.meta.totalEpisodes-1)/2} y={P.t} width={innerW/(D.meta.totalEpisodes-1)} height={innerH}
              fill="transparent"
              onMouseEnter={() => setHover({ep})}/>
          ))}
        </svg>
        <div className="ssx-trajectory__legend">
          {D.teams.map(t => (
            <button key={t.id} className={`ssx-trajectory__legend-item ${hover === t.id ? "is-active" : ""}`}
              onMouseEnter={() => setHover(t.id)} onMouseLeave={() => setHover(null)}>
              <span className="ssx-trajectory__swatch" style={{background: t.color}}></span>
              <span>{t.short.toUpperCase()}</span>
              <span className="ssx-trajectory__legend-pts">{D.scores[t.id].total}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ Team Rosters ============
function TeamRosters() {
  return (
    <section className="ssx-card ssx-rosters">
      <div className="ssx-card__header">
        <div className="ssx-card__icon">
          <svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
        </div>
        <h3>TRIBE ROSTERS</h3>
        <div className="ssx-card__sub">CASTAWAYS BY COACH</div>
      </div>
      <div className="ssx-rosters__grid">
        {D.teams.map(team => {
          const players = D.players.filter(p => p.team === team.id);
          const alive = players.filter(p => p.placement === null).length;
          return (
            <div key={team.id} className="ssx-tribe" style={{"--team-color": team.color}}>
              <div className="ssx-tribe__banner" style={{background: team.color}}>
                <div className="ssx-tribe__name">{team.short.toUpperCase()}</div>
                <div className="ssx-tribe__buff">{team.buff}</div>
              </div>
              <div className="ssx-tribe__alive-count">
                <span className="ssx-tribe__alive-num">{alive}</span>
                <span className="ssx-tribe__alive-lbl">/{players.length} ALIVE</span>
              </div>
              <ul className="ssx-tribe__roster">
                {players.map(p => (
                  <li key={p.name} className={"ssx-tribe__player " + (p.placement === null ? "is-alive" : "is-out")}>
                    <span className="ssx-tribe__torch" aria-hidden="true">
                      {p.placement === null
                        ? <svg viewBox="0 0 12 16" width="12" height="16"><path fill="var(--ssx-fire)" d="M6 0C7 3 10 4 9 8c0 2-1.5 3.5-3 3.5S3 10 3 8c-1-3 2-5 3-8z"/><rect x="5" y="11" width="2" height="5" fill="var(--ssx-ink-dim)"/></svg>
                        : <svg viewBox="0 0 12 16" width="12" height="16"><rect x="5" y="3" width="2" height="13" fill="var(--ssx-ink-dim)"/><path fill="var(--ssx-ink-dim)" d="M2 3h8l-1 2H3z" opacity="0.5"/></svg>}
                    </span>
                    <span className="ssx-tribe__player-name">{p.name}</span>
                    {p.placement === null
                      ? <span className="ssx-tribe__player-tag ssx-tribe__player-tag--alive">ALIVE</span>
                      : <span className="ssx-tribe__player-tag ssx-tribe__player-tag--out">EP{p.ep}</span>}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ============ Recent Eliminations ============
function pointsFor(placement) {
  if (placement == null) return 0;
  const base = Math.max(0, 25 - placement);
  const top3 = placement <= 3 ? 10 : 0;
  const winner = placement === 1 ? 10 : 0;
  return base + top3 + winner;
}

function RecentEliminations() {
  const eliminated = D.players
    .filter(p => p.placement !== null)
    .sort((a,b) => b.ep - a.ep || a.placement - b.placement);
  const title = D.meta.seasonComplete ? "FINAL PLACEMENTS" : "SNUFFED TORCHES";
  const sub = D.meta.seasonComplete
    ? "ALL " + eliminated.length + " CASTAWAYS · PLACEMENT · POINTS BANKED"
    : "PLACEMENT · POINTS BANKED";
  return (
    <section className="ssx-card ssx-elim">
      <div className="ssx-card__header">
        <div className="ssx-card__icon">
          <svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M12 2l1 1-3 4-4 1 1 4-3 3 3 3-1 4 4 1 3 3 3-3 4-1-1-4 3-3-3-3 1-4-4-1-3-4z" opacity="0.18"/><path fill="none" stroke="currentColor" strokeWidth="2" d="M5 5l14 14M19 5L5 19"/></svg>
        </div>
        <h3>{title}</h3>
        <div className="ssx-card__sub">{sub}</div>
      </div>
      <ol className="ssx-elim__list">
        {eliminated.map((p) => {
          const team = teamById(p.team);
          const pts = pointsFor(p.placement);
          const isWinner = p.placement === 1;
          return (
            <li key={p.name} className={"ssx-elim__row " + (isWinner ? "is-winner" : "")}>
              <div className="ssx-elim__ep">EP {p.ep}</div>
              <div className="ssx-elim__torch">
                {isWinner
                  ? <svg viewBox="0 0 16 16" width="14" height="14"><path fill="var(--ssx-fire)" d="M2 5l3 3 3-5 3 5 3-3-1 7H3z"/><rect x="3" y="12" width="10" height="1.5" fill="var(--ssx-fire)"/></svg>
                  : <svg viewBox="0 0 16 24" width="14" height="22"><rect x="7" y="6" width="2" height="18" fill="var(--ssx-ink-dim)"/><path fill="var(--ssx-ink-dim)" d="M3 6h10l-1 2H4z" opacity="0.6"/><line x1="3" y1="3" x2="13" y2="13" stroke="var(--ssx-fire)" strokeWidth="1.5"/></svg>}
              </div>
              <div className="ssx-elim__name">{p.name}</div>
              <div className="ssx-elim__team" style={{borderColor: team.color, color: team.color}}>{team.short.toUpperCase()}</div>
              <div className="ssx-elim__placement">
                <div className="ssx-elim__placement-num">{isWinner ? "WON" : "#" + p.placement}</div>
                <div className="ssx-elim__placement-lbl">PLACE</div>
              </div>
              <div className="ssx-elim__points">
                <div className="ssx-elim__points-num">+{pts}</div>
                <div className="ssx-elim__points-lbl">PTS</div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

// ============ Golden Snitch ============
function GoldenSnitch() {
  return (
    <section className="ssx-card ssx-snitch">
      <div className="ssx-card__header">
        <div className="ssx-card__icon">
          <svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="5" fill="currentColor"/><path fill="none" stroke="currentColor" strokeWidth="1.5" d="M2 12c2-3 4-3 5-2M22 12c-2-3-4-3-5-2M2 12c2 3 4 3 5 2M22 12c-2 3-4 3-5 2"/></svg>
        </div>
        <h3>GOLDEN IDOL PICKS</h3>
        <div className="ssx-card__sub">SOLE SURVIVOR PREDICTIONS · +50 IF CORRECT</div>
      </div>
      <div className="ssx-snitch__grid">
        {D.snitch.map(s => {
          const team = teamById(s.team);
          return (
            <div key={s.team} className="ssx-snitch__card" style={{"--team-color": team.color}}>
              <div className="ssx-snitch__coach">{team.coach.toUpperCase()}</div>
              <div className="ssx-snitch__pick">{s.pick}</div>
              <div className={"ssx-snitch__status ssx-snitch__status--" + s.status}>
                {s.status === "alive" ? "STILL IN" : "ELIMINATED"}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ============ Prediction Accuracy ============
function PredictionAccuracy() {
  const stats = D.teams.map(t => {
    const all = D.predictions.filter(p => p.team === t.id);
    const correct = all.filter(p => p.correct).length;
    return { ...t, correct, total: all.length, rate: all.length ? correct / all.length : 0 };
  }).sort((a,b) => b.rate - a.rate);
  return (
    <section className="ssx-card ssx-acc">
      <div className="ssx-card__header">
        <div className="ssx-card__icon">
          <svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>
        </div>
        <h3>BOOT PREDICTION ACCURACY</h3>
        <div className="ssx-card__sub">CORRECT EPISODE BOOT CALLS</div>
      </div>
      <div className="ssx-acc__list">
        {stats.map(s => {
          const pct = Math.round(s.rate * 100);
          return (
            <div key={s.id} className="ssx-acc__row" style={{"--team-color": s.color}}>
              <div className="ssx-acc__name">{s.coach}</div>
              <div className="ssx-acc__bar">
                <div className="ssx-acc__bar-fill" style={{width: Math.max(pct, 4) + "%", background: s.color}}></div>
                <div className="ssx-acc__bar-target" style={{left: "25%"}} title="Avg expected">
                  <span>{Math.round(100/24)}% baseline</span>
                </div>
              </div>
              <div className="ssx-acc__count">{s.correct}/{s.total}</div>
              <div className="ssx-acc__pct">{pct}%</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ============ Power Rankings ============
function PowerRankings() {
  const ranked = [...D.teams]
    .map(t => ({ ...t, ...D.power[t.id] }))
    .sort((a,b) => a.rank - b.rank);
  const maxScore = Math.max(...ranked.map(r => r.score));
  return (
    <section className="ssx-card ssx-power">
      <div className="ssx-card__header">
        <div className="ssx-card__icon">
          <svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M13 2L4 14h6l-1 8 9-12h-6z"/></svg>
        </div>
        <h3>POWER RANKINGS</h3>
        <div className="ssx-card__sub">WHO CAN STILL OUTWIT, OUTPLAY, OUTLAST?</div>
      </div>
      <div className="ssx-power__legend">
        <span><strong>POWER SCORE</strong> = BANKED + (POTENTIAL × 0.5)</span>
        <span>POTENTIAL = REMAINING ROSTER + EPISODES LEFT × 10 + SNITCH BONUS</span>
      </div>
      <div className="ssx-power__rows">
        {ranked.map(r => (
          <div key={r.id} className="ssx-power__row" style={{"--team-color": r.color}}>
            <div className="ssx-power__rank">#{r.rank}</div>
            <div className="ssx-power__name-block">
              <div className="ssx-power__name">{r.coach.toUpperCase()}</div>
              <div className="ssx-power__sub">{r.remaining} CASTAWAY{r.remaining===1?"":"S"} REMAINING</div>
            </div>
            <div className="ssx-power__score">
              <div className="ssx-power__score-num">{r.score}</div>
              <div className="ssx-power__score-lbl">POWER</div>
            </div>
            <div className="ssx-power__stack">
              <div className="ssx-power__stack-bar">
                <div className="ssx-power__stack-banked" style={{width: (r.banked/maxScore*100*2) + "%", background: r.color}}>
                  <span>{r.banked} BANKED</span>
                </div>
                <div className="ssx-power__stack-pot" style={{width: ((r.potential*0.5)/maxScore*100*2) + "%", background: r.color}}>
                  <span>+{r.potential * 0.5} POTENTIAL</span>
                </div>
              </div>
              <div className="ssx-power__chips">
                <span className="ssx-power__chip">ROSTER MAX <strong>{r.maxPlayer}</strong></span>
                <span className="ssx-power__chip">EPS LEFT <strong>{r.epsLeft}</strong></span>
                <span className={"ssx-power__chip " + (r.snitch ? "is-hot" : "is-cold")}>IDOL <strong>{r.snitch ? "+50" : "0"}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, {
  SurvivorHeader, SeasonAtAGlance, Standings, TrajectoryChart,
  TeamRosters, RecentEliminations, GoldenSnitch, PredictionAccuracy, PowerRankings,
  ChampionBanner,
});
