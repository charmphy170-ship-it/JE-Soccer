'use client'

import { MatchOdds } from "@/types"

interface OddsBarProps {
  odds: MatchOdds
}

export function OddsBar({ odds }: OddsBarProps) {
  const total = 1 / odds.homeWin + 1 / odds.draw + 1 / odds.awayWin
  const homeProb = ((1 / odds.homeWin) / total) * 100
  const drawProb = ((1 / odds.draw) / total) * 100
  const awayProb = ((1 / odds.awayWin) / total) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400">1X2 Odds</span>
        <span className="text-gray-500">Implied probability</span>
      </div>

      <div className="h-8 rounded-lg overflow-hidden flex">
        <div className="bg-je-neon flex items-center justify-center text-je-dark text-xs font-bold" style={{ width: `${homeProb}%` }}>
          {homeProb > 15 && `1`}
        </div>
        <div className="bg-je-yellow flex items-center justify-center text-je-dark text-xs font-bold" style={{ width: `${drawProb}%` }}>
          {drawProb > 15 && `X`}
        </div>
        <div className="bg-je-hot flex items-center justify-center text-white text-xs font-bold" style={{ width: `${awayProb}%` }}>
          {awayProb > 15 && `2`}
        </div>
      </div>

      <div className="flex justify-between text-xs">
        <div className="text-center">
          <div className="text-je-neon font-bold">{odds.homeWin}</div>
          <div className="text-gray-500">Home</div>
        </div>
        <div className="text-center">
          <div className="text-je-yellow font-bold">{odds.draw}</div>
          <div className="text-gray-500">Draw</div>
        </div>
        <div className="text-center">
          <div className="text-je-hot font-bold">{odds.awayWin}</div>
          <div className="text-gray-500">Away</div>
        </div>
      </div>
    </div>
  )
}
