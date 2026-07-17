'use client'

import { useEffect, useState } from "react"
import { NewsItem } from "@/types"
import { NewsCard } from "@/components/NewsCard"
import { SectionHeader } from "@/components/SectionHeader"
import { Newspaper, Filter } from "lucide-react"

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [category, setCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/news").then(r => r.json()).then(d => {
      setNews(d.news)
      setLoading(false)
    })
  }, [])

  const categories = ["all", "Premier League", "La Liga", "Champions League", "Transfer"]
  const filtered = category === "all" ? news : news.filter(n => n.category === category)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <SectionHeader title="Latest News" subtitle="Breaking stories from around the world" icon={<Newspaper className="w-5 h-5 text-je-purple" />} />

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              category === c ? "bg-je-neon text-je-dark" : "bg-je-card text-gray-400 border border-je-border hover:text-white"
            }`}>
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="bg-je-card rounded-xl border border-je-border shimmer h-64" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <NewsCard key={item.id} news={item} variant={i === 0 ? "featured" : "default"} />
          ))}
        </div>
      )}
    </div>
  )
}
