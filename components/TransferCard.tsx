'use client'

import { Transfer } from "@/types"
import { ArrowRight, ArrowLeftRight } from "lucide-react"

interface TransferCardProps {
  transfer: Transfer
}

export function TransferCard({ transfer }: TransferCardProps) {
  return (
    <div className="bg-je-card rounded-xl p-4 border border-je-border card-hover">
      <div className="flex items-center gap-3 mb-3">
        {transfer.playerPhoto ? (
          <img src={transfer.playerPhoto} alt={transfer.playerName} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-je-neon to-je-electric flex items-center justify-center text-je-dark font-bold text-sm">
            {transfer.playerName.split(" ").map(n => n[0]).join("")}
          </div>
        )}
        <div>
          <h3 className="text-sm font-bold text-white">{transfer.playerName}</h3>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
            transfer.type === 'permanent' ? 'bg-je-neon/20 text-je-neon' :
            transfer.type === 'loan' ? 'bg-je-cyan/20 text-je-cyan' :
            'bg-je-yellow/20 text-je-yellow'
          }`}>
            {transfer.type.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          {transfer.fromTeamLogo && <img src={transfer.fromTeamLogo} alt="" className="w-6 h-6 object-contain" />}
          <span className="text-xs text-gray-400 truncate">{transfer.fromTeam}</span>
        </div>

        <div className="flex items-center gap-1 px-3">
          <ArrowLeftRight className="w-4 h-4 text-je-neon" />
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <span className="text-xs text-gray-400 truncate">{transfer.toTeam}</span>
          {transfer.toTeamLogo && <img src={transfer.toTeamLogo} alt="" className="w-6 h-6 object-contain" />}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-je-border flex items-center justify-between">
        <span className="text-[10px] text-gray-500">{new Date(transfer.date).toLocaleDateString()}</span>
        <span className="text-sm font-bold text-je-lime">{transfer.fee}</span>
      </div>
    </div>
  )
}
