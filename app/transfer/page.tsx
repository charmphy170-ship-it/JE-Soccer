'use client'

import { useEffect, useState } from "react"
import { Transfer } from "@/types"
import { TransferCard } from "@/components/TransferCard"
import { SectionHeader } from "@/components/SectionHeader"
import { ArrowRight, Filter } from "lucide-react"

export default function TransferPage() {
  const [transfers, setTransfers] = useState<Transfer[]>([])
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/transfer").then(r => r.json()).then(d => {
      setTransfers(d.transfers)
      setLoading(false)
    })
  }, [])

  const filtered = filter === "all" ? transfers : transfers.filter(t => t.type === filter)

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <SectionHeader title="Transfer Tracker" subtitle="Latest moves in the transfer window" icon={<ArrowRight className="w-5 h-5 text-je-orange" />} />

      <div className="flex gap-2 mb-6">
        {["all", "permanent", "loan", "free"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              filter === f ? "bg-je-neon text-je-dark" : "bg-je-card text-gray-400 border border-je-border hover:text-white"
            }`}>
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3,4,5].map(i => <div key={i} className="bg-je-card rounded-xl p-4 border border-je-border shimmer h-24" />)}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(t => <TransferCard key={t.id} transfer={t} />)}
        </div>
      )}
    </div>
  )
}
