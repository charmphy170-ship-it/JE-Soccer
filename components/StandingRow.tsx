'use client'

import Link from "next/link"
import { TeamStanding } from "@/types"
import { getFormColor } from "@/lib/utils"

interface StandingRowProps {
  team: TeamStanding
  index: number
}

export function StandingRow({ team, index }: StandingRowProps) {
  const isTop4 = team.position <= 4
  const isRelegation = team.position >= 18

  return (
    <Link href={`/team/${encodeURIComponent(team.team)}`}>
      <div className={`flex items-center gap-3 py-3 px-4 hover:bg-white/5 transition-colors cursor-pointer ${
        index % 2 === 0 ? "bg-je-card/50" : ""
      }`}>
        <div className={`w-6 text-center text-sm font-bold ${
          isTop4 ? "text-je-neon" : isRelegation ? "text-je-hot" : "text-gray-400"
        }`}>
          {team.position}
        </div>

        {team.teamLogo && (
          <img src={team.teamLogo} alt="" className="w-6 h-6 object-contain" />
        )}

        <span className="flex-1 text-sm font-semibold text-white truncate">{team.team}</span>

        <div className="hidden sm:flex items-center gap-1 mr-4">
          {team.form.map((result, i) => (
            <span key={i} className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${getFormColor(result)}`}>
              {result}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span className="w-6 text-center text-gray-400">{team.played}</span>
          <span className="w-6 text-center text-je-neon font-bold">{team.won}</span>
          <span className="w-6 text-center text-je-yellow">{team.drawn}</span>
          <span className="w-6 text-center text-je-hot">{team.lost}</span>
          <span className="w-8 text-center text-gray-300">{team.goalsFor}:{team.goalsAgainst}</span>
          <span className="w-8 text-center text-white font-black">{team.points}</span>
        </div>
      </div>
    </Link>
  )
}
