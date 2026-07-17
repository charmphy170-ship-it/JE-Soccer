import { NextResponse } from "next/server"
export async function GET() {
  return NextResponse.json({
    team: { id: "1", name: "JE United", totalPoints: 1847, gameweekPoints: 68, budget: 2.3, rank: 42 },
    leaderboard: [
      { rank: 1, user: { display_name: "SoccerKing", username: "soccerking" }, points: 2156, correctPredictions: 89, streak: 7 },
      { rank: 2, user: { display_name: "GoalMaster", username: "goalmaster" }, points: 2102, correctPredictions: 85, streak: 5 },
      { rank: 3, user: { display_name: "FootballFan", username: "footballfan" }, points: 2089, correctPredictions: 82, streak: 4 },
      { rank: 4, user: { display_name: "StrikerPro", username: "strikerpro" }, points: 2056, correctPredictions: 79, streak: 3 },
      { rank: 5, user: { display_name: "MidfieldMaestro", username: "midfield" }, points: 2012, correctPredictions: 76, streak: 2 },
    ]
  })
}
