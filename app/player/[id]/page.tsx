'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Player } from "@/types"
import { getPositionColor, getRatingColor } from "@/lib/utils"
import { Activity, Target, Shield, Clock, Award, TrendingUp } from "lucide-react"

export default function PlayerPage() {
  const { id } = useParams()
  const [player, setPlayer] = useState<Player | null>(null)

  useEffect(() => {
    fetch("/api/players/top").then(r => r.json()).then(d => {
      setPlayer(d.players.find((p: Player) => p.id === id) || d.players[0])
    })
  }, [id])

  if (!player) return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>

  const statCards = [
    { label: "Matches", value: player.stats.matches, icon: Activity, color: "text-white" },
    { label: "Goals", value: player.stats.goals, icon: Target, color: "text-je-neon" },
    { label: "Assists", value: player.stats.assists, icon: TrendingUp, color: "text-je-cyan" },
    { label: "Minutes", value: player.stats.minutes, icon: Clock, color: "text-je-yellow" },
    { label: "Pass %", value: player.stats.passAccuracy + "%", icon: Shield, color: "text-je-blue" },
    { label: "Rating", value: player.rating.toFixed(1), icon: Award, color: getRatingColor(player.rating) },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-je-card to-je-surface rounded-2xl p-6 border border-je-border mb-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-je-neon to-je-electric flex items-center justify-center text-je-dark font-black text-2xl md:text-3xl">
            {player.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-black text-white">{player.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${getPositionColor(player.position)}`}>{player.position}</span>
              <span className="text-sm text-gray-400">{player.team}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-400">{player.nationality}</span>
              <span className="text-sm text-gray-400">Age {player.age}</span>
            </div>
            {player.marketValue && (
              <div className="mt-2 text-sm font-bold text-je-lime">{player.marketValue}</div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-je-card rounded-xl p-4 border border-je-border">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-500">{stat.label}</span>
              </div>
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
            </div>
          )
        })}
      </div>

      {/* Detailed Stats */}
      <div className="bg-je-card rounded-xl p-5 border border-je-border">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Detailed Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Shots", value: player.stats.shots },
            { label: "Shots on Target", value: player.stats.shotsOnTarget },
            { label: "Passes", value: player.stats.passes },
            { label: "Tackles", value: player.stats.tackles },
            { label: "Interceptions", value: player.stats.interceptions },
            { label: "Yellow Cards", value: player.stats.yellowCards },
            { label: "Red Cards", value: player.stats.redCards },
            { label: "Clean Sheets", value: player.stats.cleanSheets || 0 },
          ].map(s => (
            <div key={s.label} className="flex justify-between py-2 border-b border-je-border/50">
              <span className="text-sm text-gray-400">{s.label}</span>
              <span className="text-sm font-bold text-white">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
