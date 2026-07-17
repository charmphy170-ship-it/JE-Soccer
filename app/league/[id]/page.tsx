'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { TeamStanding } from "@/types"
import { StandingRow } from "@/components/StandingRow"
import { SectionHeader } from "@/components/SectionHeader"
import { Trophy, Target, Zap } from "lucide-react"

export default function LeaguePage() {
  const { id } = useParams()
  const [standings, setStandings] = useState<TeamStanding[]>([])
  const [scorers, setScorers] = useState<any[]>([])
  const [tab, setTab] = useState("standings")

  useEffect(() => {
    fetch("/api/standings").then(r => r.json()).then(d => setStandings(d.standings))
    setScorers([
      { name: "Erling Haaland", team: "Man City", goals: 27, assists: 5 },
      { name: "Ollie Watkins", team: "Aston Villa", goals: 19, assists: 10 },
      { name: "Mohamed Salah", team: "Liverpool", goals: 18, assists: 12 },
      { name: "Dominic Solanke", team: "Bournemouth", goals: 17, assists: 3 },
      { name: "Jarrod Bowen", team: "West Ham", goals: 16, assists: 6 },
    ])
  }, [id])

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <div className="bg-gradient-to-br from-je-card to-je-surface rounded-2xl p-6 border border-je-border mb-6">
        <h1 className="text-2xl font-black text-white">Premier League 2024/25</h1>
        <p className="text-gray-500 text-sm mt-1">England • 20 Teams • Matchweek 28</p>
      </div>

      <div className="flex gap-1 bg-je-card rounded-xl p-1 mb-6 border border-je-border">
        {["standings", "top scorers", "fixtures"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              tab === t ? "bg-je-neon text-je-dark" : "text-gray-400 hover:text-white"
            }`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "standings" && (
        <div className="bg-je-card rounded-xl border border-je-border overflow-hidden">
          <div className="flex items-center gap-4 px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-je-border">
            <span className="w-6 text-center">#</span>
            <span className="flex-1">Team</span>
            <span className="hidden sm:flex gap-4">
              <span className="w-6 text-center">P</span>
              <span className="w-6 text-center">W</span>
              <span className="w-6 text-center">D</span>
              <span className="w-6 text-center">L</span>
              <span className="w-8 text-center">GD</span>
            </span>
            <span className="w-8 text-center">PTS</span>
          </div>
          {standings.map((team, i) => (
            <StandingRow key={team.position} team={team} index={i} />
          ))}
        </div>
      )}

      {tab === "top scorers" && (
        <div className="space-y-2">
          {scorers.map((s, i) => (
            <div key={i} className="bg-je-card rounded-xl p-4 border border-je-border flex items-center gap-4">
              <span className="w-8 text-center text-lg font-black text-je-neon">{i + 1}</span>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-white">{s.name}</h3>
                <p className="text-xs text-gray-500">{s.team}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-je-neon">{s.goals}</div>
                <div className="text-[10px] text-gray-500">{s.assists} A</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "fixtures" && (
        <div className="bg-je-card rounded-xl p-8 text-center text-gray-500 border border-je-border">
          <Target className="w-12 h-12 mx-auto mb-3 text-gray-600" />
          <p>Full fixture list coming soon</p>
        </div>
      )}
    </div>
  )
}
