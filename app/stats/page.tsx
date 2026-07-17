'use client'

import { useEffect, useState } from "react"
import { Player } from "@/types"
import { PlayerCard } from "@/components/PlayerCard"
import { SectionHeader } from "@/components/SectionHeader"
import { BarChart3, Trophy, Target, Zap, Shield } from "lucide-react"

type StatTab = "goals" | "assists" | "rating" | "cleanSheets"

export default function StatsPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [tab, setTab] = useState<StatTab>("goals")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/players/top").then(r => r.json()).then(d => {
      setPlayers(d.players)
      setLoading(false)
    })
  }, [])

  const sorted = [...players].sort((a, b) => {
    if (tab === "goals") return b.stats.goals - a.stats.goals
    if (tab === "assists") return b.stats.assists - a.stats.assists
    if (tab === "rating") return b.rating - a.rating
    return (b.stats.cleanSheets || 0) - (a.stats.cleanSheets || 0)
  })

  const tabs = [
    { id: "goals" as StatTab, label: "Top Scorers", icon: Target },
    { id: "assists" as StatTab, label: "Top Assists", icon: Zap },
    { id: "rating" as StatTab, label: "Best Rated", icon: Trophy },
    { id: "cleanSheets" as StatTab, label: "Clean Sheets", icon: Shield },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <SectionHeader title="Player Stats" subtitle="Leaders across all categories" icon={<BarChart3 className="w-5 h-5 text-je-neon" />} />

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map(t => {
          const Icon = t.icon
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                tab === t.id ? "bg-je-neon text-je-dark" : "bg-je-card text-gray-400 border border-je-border hover:text-white"
              }`}>
              <Icon className="w-4 h-4" /> {t.label}
            </button>
          )
        })}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="bg-je-card rounded-xl p-4 border border-je-border shimmer h-40" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((p, i) => (
            <div key={p.id} className="relative">
              {i < 3 && (
                <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-je-neon flex items-center justify-center text-je-dark font-black text-sm z-10">
                  {i + 1}
                </div>
              )}
              <PlayerCard player={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
