'use client'

import Link from "next/link"
import { Player } from "@/types"
import { getPositionColor, getRatingColor } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface PlayerCardProps {
  player: Player
  showTrend?: boolean
  trend?: "up" | "down" | "same"
}

export function PlayerCard({ player, showTrend = false, trend = "same" }: PlayerCardProps) {
  return (
    <Link href={`/player/${player.id}`}>
      <div className="bg-je-card rounded-xl p-4 border border-je-border card-hover group">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {player.photo ? (
              <img src={player.photo} alt={player.name} className="w-12 h-12 rounded-full object-cover border-2 border-je-border" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-je-neon to-je-electric flex items-center justify-center text-je-dark font-bold">
                {player.name.split(" ").map(n => n[0]).join("")}
              </div>
            )}
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-je-neon transition-colors">{player.name}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getPositionColor(player.position)}`}>
                  {player.position}
                </span>
                {player.teamLogo && <img src={player.teamLogo} alt="" className="w-4 h-4 object-contain" />}
                <span className="text-[10px] text-gray-500">{player.team}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-xl font-black ${getRatingColor(player.rating)}`}>{player.rating.toFixed(1)}</div>
            {showTrend && (
              <div className="flex justify-end">
                {trend === "up" && <TrendingUp className="w-3 h-3 text-je-neon" />}
                {trend === "down" && <TrendingDown className="w-3 h-3 text-je-hot" />}
                {trend === "same" && <Minus className="w-3 h-3 text-gray-500" />}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-je-surface rounded-lg p-2">
            <div className="text-xs font-bold text-white">{player.stats.matches}</div>
            <div className="text-[9px] text-gray-500 uppercase">MP</div>
          </div>
          <div className="bg-je-surface rounded-lg p-2">
            <div className="text-xs font-bold text-je-neon">{player.stats.goals}</div>
            <div className="text-[9px] text-gray-500 uppercase">G</div>
          </div>
          <div className="bg-je-surface rounded-lg p-2">
            <div className="text-xs font-bold text-je-cyan">{player.stats.assists}</div>
            <div className="text-[9px] text-gray-500 uppercase">A</div>
          </div>
          <div className="bg-je-surface rounded-lg p-2">
            <div className="text-xs font-bold text-je-yellow">{player.stats.minutes}</div>
            <div className="text-[9px] text-gray-500 uppercase">MIN</div>
          </div>
        </div>

        {player.marketValue && (
          <div className="mt-3 pt-3 border-t border-je-border flex items-center justify-between">
            <span className="text-[10px] text-gray-500">Market Value</span>
            <span className="text-xs font-bold text-je-lime">{player.marketValue}</span>
          </div>
        )}
      </div>
    </Link>
  )
}
