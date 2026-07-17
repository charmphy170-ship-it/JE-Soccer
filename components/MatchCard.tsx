'use client'

import Link from "next/link"
import { Match } from "@/types"
import { LiveIndicator } from "./LiveIndicator"
import { formatTime, formatDate } from "@/lib/utils"
import { Radio, Clock, CheckCircle } from "lucide-react"

interface MatchCardProps {
  match: Match
  variant?: "default" | "compact" | "featured"
}

export function MatchCard({ match, variant = "default" }: MatchCardProps) {
  const isLive = match.status === "LIVE"
  const isFinished = match.status === "FINISHED"

  if (variant === "featured") {
    return (
      <Link href={`/match/${match.id}`}>
        <div className="relative bg-gradient-to-br from-je-card to-je-surface rounded-2xl p-6 border border-je-border card-hover overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-je-neon/5 rounded-full blur-3xl group-hover:bg-je-neon/10 transition-all" />

          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-je-cyan bg-je-cyan/10 px-2.5 py-1 rounded-full">
              {match.competition}
            </span>
            {isLive && <LiveIndicator />}
            {isFinished && <span className="text-xs text-gray-500 flex items-center gap-1"><CheckCircle className="w-3 h-3" />FT</span>}
            {!isLive && !isFinished && (
              <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{formatTime(match.date)}</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-2 flex-1">
              {match.homeLogo && <img src={match.homeLogo} alt={match.homeTeam} className="w-14 h-14 object-contain" />}
              <span className="text-sm font-semibold text-white text-center">{match.homeTeam}</span>
            </div>

            <div className="px-6">
              {isLive || isFinished ? (
                <div className="flex items-center gap-3 text-3xl font-black">
                  <span className={isLive ? "text-je-neon neon-text" : "text-white"}>{match.homeScore}</span>
                  <span className="text-gray-600">-</span>
                  <span className={isLive ? "text-je-neon neon-text" : "text-white"}>{match.awayScore}</span>
                </div>
              ) : (
                <div className="text-2xl font-black text-gray-500">VS</div>
              )}
              {isLive && match.displayClock && (
                <div className="text-center text-xs text-je-hot font-bold mt-1">{match.displayClock}</div>
              )}
            </div>

            <div className="flex flex-col items-center gap-2 flex-1">
              {match.awayLogo && <img src={match.awayLogo} alt={match.awayTeam} className="w-14 h-14 object-contain" />}
              <span className="text-sm font-semibold text-white text-center">{match.awayTeam}</span>
            </div>
          </div>

          {match.predictions && (
            <div className="mt-4 pt-4 border-t border-je-border">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">AI Prediction</span>
                <span className="text-je-neon font-bold">{match.predictions.predictedScore}</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    )
  }

  if (variant === "compact") {
    return (
      <Link href={`/match/${match.id}`}>
        <div className="flex items-center gap-3 bg-je-card rounded-xl p-3 border border-je-border hover:border-je-neon/30 transition-all">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {match.homeLogo && <img src={match.homeLogo} alt="" className="w-6 h-6 object-contain" />}
            <span className="text-sm font-medium text-white truncate">{match.homeTeam}</span>
          </div>
          <div className="text-center min-w-[60px]">
            {isLive || isFinished ? (
              <span className={`text-sm font-bold ${isLive ? "text-je-neon" : "text-white"}`}>
                {match.homeScore} - {match.awayScore}
              </span>
            ) : (
              <span className="text-xs text-gray-500">{formatTime(match.date)}</span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
            <span className="text-sm font-medium text-white truncate">{match.awayTeam}</span>
            {match.awayLogo && <img src={match.awayLogo} alt="" className="w-6 h-6 object-contain" />}
          </div>
          {isLive && <LiveIndicator size="sm" />}
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/match/${match.id}`}>
      <div className="bg-je-card rounded-xl p-4 border border-je-border card-hover group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{match.competition}</span>
          <div className="flex items-center gap-2">
            {isLive && <LiveIndicator size="sm" />}
            {isFinished && <span className="text-[10px] text-gray-500">FT</span>}
            {!isLive && !isFinished && <span className="text-[10px] text-gray-500">{formatDate(match.date)}</span>}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {match.homeLogo && <img src={match.homeLogo} alt="" className="w-8 h-8 object-contain" />}
            <span className="text-sm font-semibold text-white">{match.homeTeam}</span>
          </div>

          <div className="px-4">
            {isLive || isFinished ? (
              <div className="flex items-center gap-2 text-lg font-black">
                <span className={isLive ? "text-je-neon" : ""}>{match.homeScore}</span>
                <span className="text-gray-600">-</span>
                <span className={isLive ? "text-je-neon" : ""}>{match.awayScore}</span>
              </div>
            ) : (
              <span className="text-sm font-bold text-gray-500">VS</span>
            )}
          </div>

          <div className="flex items-center gap-3 flex-1 justify-end">
            <span className="text-sm font-semibold text-white">{match.awayTeam}</span>
            {match.awayLogo && <img src={match.awayLogo} alt="" className="w-8 h-8 object-contain" />}
          </div>
        </div>

        {match.odds && (
          <div className="mt-3 pt-3 border-t border-je-border flex items-center justify-between text-[10px]">
            <span className="text-gray-500">Odds</span>
            <div className="flex gap-3">
              <span className="text-je-neon">1 <span className="text-white">{match.odds.homeWin}</span></span>
              <span className="text-je-yellow">X <span className="text-white">{match.odds.draw}</span></span>
              <span className="text-je-hot">2 <span className="text-white">{match.odds.awayWin}</span></span>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
