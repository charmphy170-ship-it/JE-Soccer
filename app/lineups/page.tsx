'use client'

import { useEffect, useState } from "react"
import { SectionHeader } from "@/components/SectionHeader"
import { Users, Save, RotateCcw } from "lucide-react"

export default function LineupsPage() {
  const [lineup, setLineup] = useState<any>(null)

  useEffect(() => {
    fetch("/api/lineups").then(r => r.json()).then(d => setLineup(d.lineup))
  }, [])

  if (!lineup) return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <SectionHeader title="Lineup Builder" subtitle="Create and share your dream XI" icon={<Users className="w-5 h-5 text-je-cyan" />} />

      <div className="bg-gradient-to-b from-je-neon/5 to-transparent rounded-2xl p-6 border border-je-border mb-6">
        <div className="text-center mb-6">
          <h2 className="text-sm font-bold text-je-neon mb-1">FORMATION</h2>
          <div className="text-2xl font-black text-white">{lineup.homeFormation}</div>
        </div>

        {/* Pitch visualization */}
        <div className="relative bg-gradient-to-b from-je-card to-je-surface rounded-xl border border-je-neon/20 p-4" style={{ aspectRatio: "2/3" }}>
          {/* Pitch lines */}
          <div className="absolute inset-4 border border-white/10 rounded-lg" />
          <div className="absolute top-1/2 left-4 right-4 border-t border-white/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/10 rounded-full" />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-10 border border-white/10" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-10 border border-white/10" />

          {/* Players */}
          <div className="relative h-full flex flex-col justify-between py-6">
            {/* GK */}
            <div className="flex justify-center">
              <PlayerDot name="Ederson" num={31} color="bg-je-yellow" />
            </div>
            {/* DEF */}
            <div className="flex justify-around px-4">
              <PlayerDot name="Walker" num={2} color="bg-je-blue" />
              <PlayerDot name="Dias" num={3} color="bg-je-blue" />
              <PlayerDot name="Akanji" num={25} color="bg-je-blue" />
              <PlayerDot name="Gvardiol" num={24} color="bg-je-blue" />
            </div>
            {/* MID */}
            <div className="flex justify-around px-8">
              <PlayerDot name="Rodri" num={16} color="bg-je-neon" />
              <PlayerDot name="De Bruyne" num={17} color="bg-je-neon" />
              <PlayerDot name="Foden" num={47} color="bg-je-neon" />
            </div>
            {/* FWD */}
            <div className="flex justify-around px-12">
              <PlayerDot name="Silva" num={20} color="bg-je-hot" />
              <PlayerDot name="Haaland" num={9} color="bg-je-hot" />
              <PlayerDot name="Doku" num={11} color="bg-je-hot" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-je-neon text-je-dark rounded-xl font-bold text-sm hover:bg-je-lime transition-colors">
          <Save className="w-4 h-4" /> Save Lineup
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-je-card border border-je-border text-white rounded-xl font-bold text-sm hover:border-je-neon transition-colors">
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>
    </div>
  )
}

function PlayerDot({ name, num, color }: { name: string; num: number; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center text-je-dark font-bold text-xs shadow-lg`}>
        {num}
      </div>
      <span className="text-[10px] text-white font-medium">{name}</span>
    </div>
  )
}
