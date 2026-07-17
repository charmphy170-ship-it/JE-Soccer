'use client'

import { useEffect, useState } from "react"
import { SectionHeader } from "@/components/SectionHeader"
import { Trophy, Medal, Crown } from "lucide-react"

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/fantasy").then(r => r.json()).then(d => setLeaders(d.leaderboard))
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <SectionHeader title="Global Leaderboard" subtitle="Top predictors this season" icon={<Trophy className="w-5 h-5 text-je-yellow" />} />

      <div className="bg-je-card rounded-xl border border-je-border overflow-hidden">
        <div className="flex items-center gap-4 px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-je-border">
          <span className="w-10 text-center">Rank</span>
          <span className="flex-1">Player</span>
          <span className="w-16 text-center">Points</span>
          <span className="w-16 text-center hidden sm:block">Correct</span>
        </div>
        {leaders.map((entry) => (
          <div key={entry.rank} className={`flex items-center gap-4 px-4 py-4 border-b border-je-border/50 hover:bg-white/5 transition-colors ${
            entry.rank === 1 ? "bg-gradient-to-r from-je-yellow/10 to-transparent" : ""
          }`}>
            <span className="w-10 text-center">
              {entry.rank === 1 ? <Crown className="w-5 h-5 text-je-yellow mx-auto" /> :
               entry.rank === 2 ? <Medal className="w-5 h-5 text-gray-400 mx-auto" /> :
               entry.rank === 3 ? <Medal className="w-5 h-5 text-orange-600 mx-auto" /> :
               <span className="text-sm font-bold text-gray-500">{entry.rank}</span>}
            </span>
            <div className="flex-1">
              <div className="text-sm font-bold text-white">{entry.user.display_name}</div>
              <div className="text-xs text-gray-500">@{entry.user.username}</div>
            </div>
            <span className="w-16 text-center text-sm font-black text-je-neon">{entry.points}</span>
            <span className="w-16 text-center text-xs text-gray-400 hidden sm:block">{entry.correctPredictions}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
