import { NextResponse } from "next/server"

const ESPN_API = "https://site.api.espn.com/apis/site/v2/sports/soccer"

const LEAGUES = [
  "eng.1", "eng.2", "esp.1", "esp.2", "ita.1", "ger.1",
  "fra.1", "ned.1", "por.1", "uefa.champions", "uefa.europa",
  "fifa.world", "fifa.friendly",
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const leagueFilter = searchParams.get("league")

  try {
    const leaguesToFetch = leagueFilter ? [leagueFilter] : LEAGUES

    const allEvents = await Promise.all(
      leaguesToFetch.map(async (league) => {
        try {
          const res = await fetch(`${ESPN_API}/${league}/scoreboard`, {
            next: { revalidate: 30 }
          })
          if (!res.ok) return []
          const data = await res.json()
          return (data.events || []).map((e: any) => ({ ...e, leagueName: data.leagues?.[0]?.name || league }))
        } catch { return [] }
      })
    )

    const events = allEvents.flat()

    const live = events
      .filter((e: any) => e.status?.type?.state === "in")
      .map(formatMatch)
      .slice(0, 6)

    const upcoming = events
      .filter((e: any) => e.status?.type?.state === "pre")
      .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(formatMatch)
      .slice(0, 12)

    const finished = events
      .filter((e: any) => e.status?.type?.completed)
      .map(formatMatch)
      .slice(0, 8)

    return NextResponse.json({ live, upcoming, finished })
  } catch (error) {
    console.error("ESPN API Error:", error)
    return NextResponse.json({ live: [], upcoming: [], finished: [] }, { status: 500 })
  }
}

function formatMatch(event: any) {
  const comp = event.competitions?.[0]
  const home = comp?.competitors?.find((c: any) => c.homeAway === "home")
  const away = comp?.competitors?.find((c: any) => c.homeAway === "away")

  return {
    id: event.id,
    homeTeam: home?.team?.shortDisplayName || home?.team?.name || "TBD",
    awayTeam: away?.team?.shortDisplayName || away?.team?.name || "TBD",
    homeScore: home?.score?.value,
    awayScore: away?.score?.value,
    status: event.status?.type?.state === "in" ? "LIVE" :
            event.status?.type?.completed ? "FINISHED" : "SCHEDULED",
    date: event.date,
    competition: event.leagueName || "Unknown",
    venue: comp?.venue?.fullName,
    homeLogo: home?.team?.logo,
    awayLogo: away?.team?.logo,
    displayClock: event.status?.displayClock,
    period: event.status?.period,
    odds: generateOdds(home?.score?.value, away?.score?.value, event.status?.type?.state),
    predictions: generatePrediction(home, away),
  }
}

function generateOdds(homeScore?: number, awayScore?: number, status?: string) {
  if (status === "in") {
    return {
      homeWin: Number((1.5 + Math.random()).toFixed(2)),
      draw: Number((3.0 + Math.random() * 2).toFixed(2)),
      awayWin: Number((2.0 + Math.random() * 2).toFixed(2)),
      over25: 1.85,
      under25: 1.95,
      btts: 1.75,
    }
  }
  return {
    homeWin: Number((1.8 + Math.random() * 2).toFixed(2)),
    draw: Number((3.2 + Math.random()).toFixed(2)),
    awayWin: Number((2.5 + Math.random() * 2).toFixed(2)),
    over25: 1.85,
    under25: 1.95,
    btts: 1.75,
  }
}

function generatePrediction(home: any, away: any) {
  const homeStrength = Math.random() * 40 + 30
  const drawProb = Math.random() * 20 + 15
  const awayStrength = 100 - homeStrength - drawProb

  return {
    homeWinProb: Math.round(homeStrength),
    drawProb: Math.round(drawProb),
    awayWinProb: Math.round(awayStrength),
    predictedScore: `${Math.floor(Math.random() * 3)}-${Math.floor(Math.random() * 3)}`,
    confidence: Math.round(Math.random() * 30 + 60),
  }
}
