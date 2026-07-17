'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { Match, Player, NewsItem, Transfer } from "@/types"
import { MatchCard } from "@/components/MatchCard"
import { PlayerCard } from "@/components/PlayerCard"
import { NewsCard } from "@/components/NewsCard"
import { TransferCard } from "@/components/TransferCard"
import { SectionHeader } from "@/components/SectionHeader"
import { LiveIndicator } from "@/components/LiveIndicator"
import { Flame, Trophy, TrendingUp, Newspaper, ArrowRight, Zap, Star, Activity } from "lucide-react"

export default function Home() {
  const [liveMatches, setLiveMatches] = useState<Match[]>([])
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([])
  const [topPlayers, setTopPlayers] = useState<Player[]>([])
  const [news, setNews] = useState<NewsItem[]>([])
  const [transfers, setTransfers] = useState<Transfer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllData()
    const interval = setInterval(fetchAllData, 60000)
    return () => clearInterval(interval)
  }, [])

  async function fetchAllData() {
    try {
      const [matchesRes, playersRes, newsRes, transferRes] = await Promise.all([
        fetch("/api/matches"),
        fetch("/api/players/top"),
        fetch("/api/news"),
        fetch("/api/transfer"),
      ])

      const matchesData = await matchesRes.json()
      const playersData = await playersRes.json()
      const newsData = await newsRes.json()
      const transferData = await transferRes.json()

      setLiveMatches(matchesData.live || [])
      setUpcomingMatches(matchesData.upcoming || [])
      setTopPlayers(playersData.players || [])
      setNews(newsData.news || [])
      setTransfers(transferData.transfers || [])
    } catch (err) {
      console.error("Fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  const featuredMatch = liveMatches[0] || upcomingMatches[0]

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-6">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-je-card via-je-surface to-je-dark rounded-3xl p-8 mb-8 overflow-hidden border border-je-border">
        <div className="absolute top-0 right-0 w-96 h-96 bg-je-neon/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-je-cyan/5 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-je-neon to-je-electric flex items-center justify-center">
              <Zap className="w-5 h-5 text-je-dark" />
            </div>
            <span className="text-je-neon font-bold text-sm tracking-wider uppercase">Welcome to</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-3">
            JE <span className="gradient-text">Soccer</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Live scores, player stats, match predictions, fantasy football, transfers — everything soccer in one place.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/predictions" className="px-6 py-3 bg-je-neon text-je-dark rounded-xl font-bold text-sm hover:bg-je-lime transition-colors flex items-center gap-2">
              <Zap className="w-4 h-4" /> Make Predictions
            </Link>
            <Link href="/fantasy" className="px-6 py-3 bg-je-surface border border-je-border text-white rounded-xl font-bold text-sm hover:border-je-neon transition-colors flex items-center gap-2">
              <Trophy className="w-4 h-4 text-je-yellow" /> Fantasy League
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Match */}
      {featuredMatch && (
        <div className="mb-8">
          <SectionHeader 
            title="Match of the Day" 
            subtitle={featuredMatch.competition}
            action={{ label: "All matches", href: "/schedule" }}
            icon={<Star className="w-5 h-5 text-je-yellow" />}
          />
          <MatchCard match={featuredMatch} variant="featured" />
        </div>
      )}

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <div className="mb-8">
          <SectionHeader 
            title="Live Now" 
            action={{ label: "Watch all", href: "/schedule?filter=live" }}
            icon={<Flame className="w-5 h-5 text-je-hot" />}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming */}
      <div className="mb-8">
        <SectionHeader 
          title="Upcoming Matches" 
          action={{ label: "Full schedule", href: "/schedule" }}
          icon={<Activity className="w-5 h-5 text-je-cyan" />}
        />
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-je-card rounded-xl p-6 border border-je-border shimmer h-32" />
            ))}
          </div>
        ) : upcomingMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingMatches.slice(0, 6).map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div className="bg-je-card rounded-xl p-8 text-center text-gray-500 border border-je-border">
            No upcoming matches scheduled.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Players */}
        <div className="lg:col-span-2">
          <SectionHeader 
            title="Top Performers" 
            action={{ label: "All players", href: "/stats" }}
            icon={<TrendingUp className="w-5 h-5 text-je-neon" />}
          />
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-je-card rounded-xl p-4 border border-je-border shimmer h-40" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topPlayers.slice(0, 4).map((player) => (
                <PlayerCard key={player.id} player={player} showTrend trend="up" />
              ))}
            </div>
          )}
        </div>

        {/* Latest Transfers */}
        <div>
          <SectionHeader 
            title="Latest Transfers" 
            action={{ label: "All transfers", href: "/transfer" }}
            icon={<ArrowRight className="w-5 h-5 text-je-orange" />}
          />
          <div className="space-y-3">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-je-card rounded-xl p-4 border border-je-border shimmer h-24" />
              ))
            ) : (
              transfers.slice(0, 3).map((t) => (
                <TransferCard key={t.id} transfer={t} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* News */}
      <div className="mt-8">
        <SectionHeader 
          title="Latest News" 
          action={{ label: "All news", href: "/news" }}
          icon={<Newspaper className="w-5 h-5 text-je-purple" />}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-je-card rounded-xl border border-je-border shimmer h-64" />
            ))
          ) : (
            news.slice(0, 3).map((item) => (
              <NewsCard key={item.id} news={item} variant={item.id === news[0]?.id ? "featured" : "default"} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
