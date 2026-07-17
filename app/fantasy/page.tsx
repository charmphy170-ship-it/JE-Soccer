'use client'

import { useEffect, useState } from "react"
import { SectionHeader } from "@/components/SectionHeader"
import { Trophy, Users, Star, TrendingUp, DollarSign } from "lucide-react"

export default function FantasyPage() {
  const [data, setData] = useState<any>(null)
  const [tab, setTab] = useState("team")

  useEffect(() => {
    fetch("/api/fantasy").then(r => r.json()).then(d => setData(d))
  }, [])

  if (!data) return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <SectionHeader title="Fantasy League" subtitle="Build your dream team and compete" icon={<Trophy className="w-5 h-5 text-je-yellow" />} />

      <div className="flex gap-1 bg-je-card rounded-xl p-1 mb-6 border border-je-border">
        {["team", "leaderboard"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              tab === t ? "bg-je-neon text-je-dark" : "text-gray-400 hover:text-white"
            }`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "team" && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-je-card to-je-surface rounded-2xl p-6 border border-je-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-black text-white">{data.team.name}</h2>
                <p className="text-sm text-gray-500">Rank #{data.team.rank} • GW {data.team.gameweekPoints} pts</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-je-neon">{data.team.totalPoints}</div>
                <div className="text-xs text-gray-500">Total Points</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-je-lime">
              <DollarSign className="w-4 h-4" /> £{data.team.budget}M budget remaining
            </div>
          </div>

          <div className="bg-je-card rounded-xl p-5 border border-je-border">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Your XI</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Haaland (C)", "Salah", "Saka", "Foden", "De Bruyne", "Rodri", "Walker", "Dias", "Saliba", "Trippier", "Raya"].map((p, i) => (
                <div key={i} className={`bg-je-surface rounded-lg p-3 text-center border ${i === 0 ? "border-je-yellow" : "border-je-border"}`}>
                  <div className="text-xs font-bold text-white">{p}</div>
                  <div className="text-[10px] text-gray-500 mt-1">{i === 0 ? "12 pts" : `${Math.floor(Math.random() * 8)} pts`}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "leaderboard" && (
        <div className="bg-je-card rounded-xl border border-je-border overflow-hidden">
          <div className="flex items-center gap-4 px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-je-border">
            <span className="w-8 text-center">#</span>
            <span className="flex-1">Player</span>
            <span className="w-16 text-center">Points</span>
            <span className="w-16 text-center hidden sm:block">Correct</span>
            <span className="w-12 text-center hidden sm:block">Streak</span>
          </div>
          {data.leaderboard.map((entry: any) => (
            <div key={entry.rank} className="flex items-center gap-4 px-4 py-3 border-b border-je-border/50 hover:bg-white/5 transition-colors">
              <span className={`w-8 text-center text-sm font-bold ${entry.rank <= 3 ? "text-je-neon" : "text-gray-500"}`}>{entry.rank}</span>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">{entry.user.display_name}</div>
                <div className="text-xs text-gray-500">@{entry.user.username}</div>
              </div>
              <span className="w-16 text-center text-sm font-bold text-je-neon">{entry.points}</span>
              <span className="w-16 text-center text-xs text-gray-400 hidden sm:block">{entry.correctPredictions}</span>
              <span className="w-12 text-center text-xs text-je-yellow font-bold hidden sm:block">{entry.streak}🔥</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
