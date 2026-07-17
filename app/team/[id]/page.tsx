'use client'

import { useParams } from "next/navigation"
import Link from "next/link"
import { Users, Trophy, Calendar, TrendingUp } from "lucide-react"

export default function TeamPage() {
  const { id } = useParams()
  const teamName = decodeURIComponent(id as string)

  const squad = [
    { name: "Ederson", pos: "GK", num: 31 },
    { name: "Kyle Walker", pos: "DEF", num: 2 },
    { name: "Rúben Dias", pos: "DEF", num: 3 },
    { name: "John Stones", pos: "DEF", num: 5 },
    { name: "Nathan Aké", pos: "DEF", num: 6 },
    { name: "Rodri", pos: "MID", num: 16 },
    { name: "Kevin De Bruyne", pos: "MID", num: 17 },
    { name: "Phil Foden", pos: "MID", num: 47 },
    { name: "Bernardo Silva", pos: "MID", num: 20 },
    { name: "Jérémy Doku", pos: "FWD", num: 11 },
    { name: "Erling Haaland", pos: "FWD", num: 9 },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <div className="bg-gradient-to-br from-je-card to-je-surface rounded-2xl p-6 border border-je-border mb-6">
        <h1 className="text-3xl font-black text-white">{teamName}</h1>
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
          <span className="flex items-center gap-1"><Trophy className="w-4 h-4 text-je-yellow" /> 1st Place</span>
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-je-cyan" /> 28 Matches</span>
          <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4 text-je-neon" /> 64 Points</span>
        </div>
      </div>

      <div className="bg-je-card rounded-xl border border-je-border overflow-hidden">
        <div className="flex items-center gap-4 px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-je-border">
          <span className="w-8 text-center">#</span>
          <span className="flex-1">Player</span>
          <span className="w-12 text-center">Pos</span>
        </div>
        {squad.map((p) => (
          <div key={p.num} className="flex items-center gap-4 px-4 py-3 border-b border-je-border/50 hover:bg-white/5 transition-colors">
            <span className="w-8 text-center text-sm font-bold text-je-neon">{p.num}</span>
            <span className="flex-1 text-sm font-medium text-white">{p.name}</span>
            <span className={`w-12 text-center text-[10px] font-bold px-2 py-0.5 rounded ${
              p.pos === "GK" ? "bg-je-yellow/20 text-je-yellow" :
              p.pos === "DEF" ? "bg-je-blue/20 text-je-blue" :
              p.pos === "MID" ? "bg-je-neon/20 text-je-neon" :
              "bg-je-hot/20 text-je-hot"
            }`}>{p.pos}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
