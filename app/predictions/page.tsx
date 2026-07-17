'use client'

import { useEffect, useState } from "react"
import { Match } from "@/types"
import { MatchCard } from "@/components/MatchCard"
import { PredictionMeter } from "@/components/PredictionMeter"
import { SectionHeader } from "@/components/SectionHeader"
import { Zap, Trophy, Target } from "lucide-react"

export default function PredictionsPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [userScore, setUserScore] = useState(1847)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/matches").then(r => r.json()).then(d => {
      setMatches(d.upcoming.slice(0, 4))
      setLoading(false)
    })
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <SectionHeader title="Match Predictions" subtitle="Predict scores and climb the leaderboard" icon={<Zap className="w-5 h-5 text-je-neon" />} />

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-je-card rounded-xl p-4 border border-je-border text-center">
          <Trophy className="w-5 h-5 text-je-yellow mx-auto mb-1" />
          <div className="text-xl font-black text-white">{userScore}</div>
          <div className="text-[10px] text-gray-500 uppercase">Points</div>
        </div>
        <div className="bg-je-card rounded-xl p-4 border border-je-border text-center">
          <Target className="w-5 h-5 text-je-neon mx-auto mb-1" />
          <div className="text-xl font-black text-white">67%</div>
          <div className="text-[10px] text-gray-500 uppercase">Accuracy</div>
        </div>
        <div className="bg-je-card rounded-xl p-4 border border-je-border text-center">
          <Zap className="w-5 h-5 text-je-hot mx-auto mb-1" />
          <div className="text-xl font-black text-white">5</div>
          <div className="text-[10px] text-gray-500 uppercase">Streak</div>
        </div>
      </div>

      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Upcoming Matches to Predict</h3>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3,4].map(i => <div key={i} className="bg-je-card rounded-xl p-6 border border-je-border shimmer h-40" />)}
        </div>
      ) : (
        <div className="space-y-4">
          {matches.map(match => (
            <div key={match.id} className="bg-je-card rounded-xl p-5 border border-je-border">
              <MatchCard match={match} variant="compact" />
              {match.predictions && (
                <div className="mt-4 pt-4 border-t border-je-border">
                  <PredictionMeter prediction={match.predictions} />
                </div>
              )}
              <div className="mt-4 flex gap-2">
                <input type="number" placeholder="Home" className="w-16 px-3 py-2 bg-je-surface rounded-lg text-sm text-white text-center border border-je-border focus:border-je-neon focus:outline-none" />
                <span className="flex items-center text-gray-500">-</span>
                <input type="number" placeholder="Away" className="w-16 px-3 py-2 bg-je-surface rounded-lg text-sm text-white text-center border border-je-border focus:border-je-neon focus:outline-none" />
                <button className="ml-auto px-5 py-2 bg-je-neon text-je-dark rounded-lg text-sm font-bold hover:bg-je-lime transition-colors">Predict</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
