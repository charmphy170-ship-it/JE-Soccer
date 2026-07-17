import { NextResponse } from "next/server"
export async function GET() {
  return NextResponse.json({
    predictions: [
      { matchId: "1", homeWinProb: 55, drawProb: 25, awayWinProb: 20, predictedScore: "2-1", confidence: 78 },
      { matchId: "2", homeWinProb: 30, drawProb: 30, awayWinProb: 40, predictedScore: "1-2", confidence: 65 },
      { matchId: "3", homeWinProb: 60, drawProb: 22, awayWinProb: 18, predictedScore: "3-0", confidence: 82 },
    ]
  })
}
