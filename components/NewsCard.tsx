'use client'

import Link from "next/link"
import { NewsItem } from "@/types"
import { timeAgo } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

interface NewsCardProps {
  news: NewsItem
  variant?: "default" | "featured"
}

export function NewsCard({ news, variant = "default" }: NewsCardProps) {
  if (variant === "featured") {
    return (
      <Link href={news.url || "#"} target="_blank">
        <div className="relative bg-je-card rounded-2xl overflow-hidden border border-je-border card-hover group">
          {news.image && (
            <div className="relative h-48 overflow-hidden">
              <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-je-card via-je-card/50 to-transparent" />
            </div>
          )}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-je-neon bg-je-neon/10 px-2 py-0.5 rounded-full uppercase">{news.category}</span>
              <span className="text-[10px] text-gray-500">{timeAgo(news.publishedAt)}</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-je-neon transition-colors line-clamp-2">{news.title}</h3>
            <p className="text-sm text-gray-400 mt-2 line-clamp-2">{news.summary}</p>
            <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
              <span>{news.source}</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={news.url || "#"} target="_blank">
      <div className="flex gap-4 bg-je-card rounded-xl p-4 border border-je-border card-hover group">
        {news.image && (
          <img src={news.image} alt="" className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-je-cyan bg-je-cyan/10 px-1.5 py-0.5 rounded uppercase">{news.category}</span>
            <span className="text-[10px] text-gray-500">{timeAgo(news.publishedAt)}</span>
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-je-neon transition-colors line-clamp-2">{news.title}</h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{news.source}</p>
        </div>
      </div>
    </Link>
  )
}
