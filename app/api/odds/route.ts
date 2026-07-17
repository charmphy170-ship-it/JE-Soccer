import { NextResponse } from "next/server"
export async function GET() {
  return NextResponse.json({
    odds: { homeWin: 1.85, draw: 3.40, awayWin: 4.20, over25: 1.75, under25: 2.05, btts: 1.65 }
  })
}
