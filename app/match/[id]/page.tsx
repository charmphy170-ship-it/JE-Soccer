'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Match } from "@/types"
import { LiveIndicator } from "@/components/LiveIndicator"
import { OddsBar } from "@/components/OddsBar"
import { PredictionMeter } from "@/components/PredictionMeter"
import { ArrowLeft, MapPin, Users, Activity, Target, Clock } from "lucide-react"

export default function MatchDetail() {
  const { id } = useParams()
  const [match, setMatch] = useState<Match | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    fetch("/api/matches").then(r => r.json()).then(data => {
      const all = [...data.live, ...data.upcoming, ...data.finished]
      setMatch(all.find((m: Match) => m.id === id) || null)
    })
  }, [id])

  if (!match) return <div className="flex items-center justify-center h-screen text-gray-500">Loading match...</div>

  const isLive = match.status === "LIVE"
  const tabs = ["overview", "lineups", "stats", "odds", "predictions"]

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <Link href="/schedule" className="flex items-center gap-2 text-gray-400 hover:text-je-neon transition-colors mb-4 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to schedule
      </Link>

      {/* Scoreboard */}
      <div className="bg-gradient-to-br from-je-card to-je-surface rounded-2xl p-6 md:p-8 border border-je-border mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-je-cyan bg-je-cyan/10 px-3 py-1 rounded-full">{match.competition}</span>
          {isLive ? <LiveIndicator /> : <span className="text-xs text-gray-500">{match.status}</span>}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center gap-3 flex-1">
            {match.homeLogo && <img src={match.homeLogo} alt="" className="w-16 h-16 md:w-20 md:h-20 object-contain" />}
            <span className="text-sm md:text-base font-bold text-white text-center">{match.homeTeam}</span>
          </div>

          <div className="px-4 md:px-8 text-center">
            {match.status !== "SCHEDULED" ? (
              <div className="text-4xl md:text-6xl font-black text-white">
                <span className={isLive ? "text-je-neon neon-text" : ""}>{match.homeScore}</span>
                <span className="text-gray-600 mx-2">-</span>
                <span className={isLive ? "text-je-neon neon-text" : ""}>{match.awayScore}</span>
              </div>
            ) : (
              <div className="text-3xl md:text-5xl font-black text-gray-500">VS</div>
            )}
            {isLive && match.displayClock && (
              <div className="text-je-hot font-bold mt-1">{match.displayClock}</div>
            )}
            {match.status === "SCHEDULED" && (
              <div className="text-xs text-gray-500 mt-2">{new Date(match.date).toLocaleString()}</div>
            )}
          </div>

          <div className="flex flex-col items-center gap-3 flex-1">
            {match.awayLogo && <img src={match.awayLogo} alt="" className="w-16 h-16 md:w-20 md:h-20 object-contain" />}
            <span className="text-sm md:text-base font-bold text-white text-center">{match.awayTeam}</span>
          </div>
        </div>

        {match.venue && (
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
            <MapPin className="w-3 h-3" /> {match.venue}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-je-card rounded-xl p-1 mb-6 border border-je-border overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === tab ? "bg-je-neon text-je-dark" : "text-gray-400 hover:text-white"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          {match.predictions && (
            <div className="bg-je-card rounded-xl p-5 border border-je-border">
              <PredictionMeter prediction={match.predictions} />
            </div>
          )}
          {match.odds && (
            <div className="bg-je-card rounded-xl p-5 border border-je-border">
              <OddsBar odds={match.odds} />
            </div>
          )}
        </div>
      )}

      {activeTab === "lineups" && <LineupView />}
      {activeTab === "stats" && <StatsView home={match.homeTeam} away={match.awayTeam} />}
      {activeTab === "odds" && match.odds && <div className="bg-je-card rounded-xl p-5 border border-je-border"><OddsBar odds={match.odds} /></div>}
      {activeTab === "predictions" && match.predictions && <div className="bg-je-card rounded-xl p-5 border border-je-border"><PredictionMeter prediction={match.predictions} /></div>}
    </div>
  )
}

function LineupView() {
  const [lineup, setLineup] = useState<any>(null)
  useEffect(() => {
    fetch("/api/lineups").then(r => r.json()).then(d => setLineup(d.lineup))
  }, [])
  if (!lineup) return <div className="text-center py-12 text-gray-500">Loading lineups...</div>

  return (
    <div className="space-y-6">
      <div className="bg-je-card rounded-xl p-5 border border-je-border">
        <h3 className="text-sm font-bold text-je-neon mb-4 flex items-center gap-2"><Users className="w-4 h-4" /> Home - {lineup.homeFormation}</h3>
        <div className="grid grid-cols-1 gap-2">
          {lineup.home.filter((p: any) => !p.isSubstitute).map((p: any) => (
            <div key={p.number} className="flex items-center gap-3 py-2 px-3 bg-je-surface rounded-lg">
              <span className="w-6 text-center text-xs font-bold text-je-neon">{p.number}</span>
              <span className="text-sm text-white flex-1">{p.name}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-je-border text-gray-400">{p.position}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-je-card rounded-xl p-5 border border-je-border">
        <h3 className="text-sm font-bold text-je-hot mb-4 flex items-center gap-2"><Users className="w-4 h-4" /> Away - {lineup.awayFormation}</h3>
        <div className="grid grid-cols-1 gap-2">
          {lineup.away.filter((p: any) => !p.isSubstitute).map((p: any) => (
            <div key={p.number} className="flex items-center gap-3 py-2 px-3 bg-je-surface rounded-lg">
              <span className="w-6 text-center text-xs font-bold text-je-hot">{p.number}</span>
              <span className="text-sm text-white flex-1">{p.name}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-je-border text-gray-400">{p.position}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatsView({ home, away }: { home: string; away: string }) {
  const stats = [
    { label: "Possession", home: 58, away: 42 },
    { label: "Shots", home: 14, away: 8 },
    { label: "Shots on Target", home: 6, away: 3 },
    { label: "Corners", home: 7, away: 4 },
    { label: "Fouls", home: 9, away: 12 },
    { label: "Yellow Cards", home: 1, away: 2 },
    { label: "Passes", home: 420, away: 310 },
    { label: "Pass Accuracy", home: 88, away: 82 },
  ]
  return (
    <div className="bg-je-card rounded-xl p-5 border border-je-border space-y-4">
      <div className="flex justify-between text-sm font-bold text-white mb-2">
        <span>{home}</span><span>{away}</span>
      </div>
      {stats.map(s => {
        const total = s.home + s.away
        const homePct = total > 0 ? (s.home / total) * 100 : 50
        return (
          <div key={s.label}>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{s.home}</span><span>{s.label}</span><span>{s.away}</span>
            </div>
            <div className="h-2 bg-je-surface rounded-full overflow-hidden flex">
              <div className="h-full bg-je-neon transition-all" style={{ width: `${homePct}%` }} />
              <div className="h-full bg-je-hot transition-all" style={{ width: `${100 - homePct}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
