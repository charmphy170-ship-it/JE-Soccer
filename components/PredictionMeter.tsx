'use client'

import { MatchPrediction } from "@/types"

interface PredictionMeterProps {
  prediction: MatchPrediction
}

export function PredictionMeter({ prediction }: PredictionMeterProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">AI Match Prediction</span>
        <span className="text-xs text-je-neon font-bold">{prediction.confidence}% confidence</span>
      </div>

      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-je-neon">Home Win</span>
            <span className="text-white font-bold">{prediction.homeWinProb}%</span>
          </div>
          <div className="h-2 bg-je-surface rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-je-neon to-je-electric rounded-full transition-all" style={{ width: `${prediction.homeWinProb}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-je-yellow">Draw</span>
            <span className="text-white font-bold">{prediction.drawProb}%</span>
          </div>
          <div className="h-2 bg-je-surface rounded-full overflow-hidden">
            <div className="h-full bg-je-yellow rounded-full transition-all" style={{ width: `${prediction.drawProb}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-je-hot">Away Win</span>
            <span className="text-white font-bold">{prediction.awayWinProb}%</span>
          </div>
          <div className="h-2 bg-je-surface rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-je-hot to-je-orange rounded-full transition-all" style={{ width: `${prediction.awayWinProb}%` }} />
          </div>
        </div>
      </div>

      <div className="bg-je-surface rounded-lg p-3 text-center">
        <span className="text-xs text-gray-400">Predicted Score</span>
        <div className="text-2xl font-black text-je-neon neon-text mt-1">{prediction.predictedScore}</div>
      </div>
    </div>
  )
}
