'use client'

import { useEffect, useState } from "react"
import { Match } from "@/types"
import { MatchCard } from "@/components/MatchCard"
import { SectionHeader } from "@/components/SectionHeader"
import { Calendar, Filter, Flame, CheckCircle, Clock } from "lucide-react"

type FilterTab = "all" | "live" | "upcoming" | "finished"

export default function Schedule() {
  const [matches, setMatches] = useState<{ live: Match[]; upcoming: Match[]; finished: Match[] }>({ live: [], upcoming: [], finished: [] })
  const [filter, setFilter] = useState<FilterTab>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/matches").then(r => r.json()).then(data => {
      setMatches(data)
      setLoading(false)
    })
  }, [])

  const allMatches = [...matches.live, ...matches.upcoming, ...matches.finished]
  const filtered = filter === "all" ? allMatches :
    filter === "live" ? matches.live :
    filter === "upcoming" ? matches.upcoming :
    matches.finished

  const tabs: { id: FilterTab; label: string; icon: any; count: number }[] = [
    { id: "all", label: "All", icon: Calendar, count: allMatches.length },
    { id: "live", label: "Live", icon: Flame, count: matches.live.length },
    { id: "upcoming", label: "Upcoming", icon: Clock, count: matches.upcoming.length },
    { id: "finished", label: "Finished", icon: CheckCircle, count: matches.finished.length },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <SectionHeader title="Match Schedule" subtitle="All fixtures across top leagues" icon={<Calendar className="w-5 h-5 text-je-neon" />} />

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setFilter(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                filter === tab.id ? "bg-je-neon text-je-dark" : "bg-je-card text-gray-400 border border-je-border hover:text-white"
              }`}>
              <Icon className="w-4 h-4" /> {tab.label} ({tab.count})
            </button>
          )
        })}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="bg-je-card rounded-xl p-6 border border-je-border shimmer h-32" />)}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(m => <MatchCard key={m.id} match={m} />)}
        </div>
      ) : (
        <div className="bg-je-card rounded-xl p-12 text-center text-gray-500 border border-je-border">No matches found.</div>
      )}
    </div>
  )
}
