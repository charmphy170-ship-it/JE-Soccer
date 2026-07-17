import { NextResponse } from "next/server"

export async function GET() {
  const standings = [
    { position: 1, team: "Man City", teamLogo: "", played: 28, won: 20, drawn: 4, lost: 4, goalsFor: 62, goalsAgainst: 25, goalDifference: 37, points: 64, form: ["W","W","D","W","W"] },
    { position: 2, team: "Arsenal", teamLogo: "", played: 28, won: 20, drawn: 4, lost: 4, goalsFor: 70, goalsAgainst: 24, goalDifference: 46, points: 64, form: ["W","W","W","D","W"] },
    { position: 3, team: "Liverpool", teamLogo: "", played: 28, won: 19, drawn: 7, lost: 2, goalsFor: 65, goalsAgainst: 26, goalDifference: 39, points: 64, form: ["D","W","W","W","D"] },
    { position: 4, team: "Aston Villa", teamLogo: "", played: 28, won: 17, drawn: 4, lost: 7, goalsFor: 59, goalsAgainst: 41, goalDifference: 18, points: 55, form: ["W","L","W","W","L"] },
    { position: 5, team: "Tottenham", teamLogo: "", played: 27, won: 16, drawn: 5, lost: 6, goalsFor: 59, goalsAgainst: 39, goalDifference: 20, points: 53, form: ["W","W","L","W","W"] },
    { position: 6, team: "Man United", teamLogo: "", played: 28, won: 15, drawn: 2, lost: 11, goalsFor: 39, goalsAgainst: 39, goalDifference: 0, points: 47, form: ["L","W","W","L","W"] },
    { position: 7, team: "West Ham", teamLogo: "", played: 28, won: 12, drawn: 7, lost: 9, goalsFor: 45, goalsAgainst: 49, goalDifference: -4, points: 43, form: ["D","L","W","D","L"] },
    { position: 8, team: "Newcastle", teamLogo: "", played: 28, won: 12, drawn: 4, lost: 12, goalsFor: 59, goalsAgainst: 48, goalDifference: 11, points: 40, form: ["W","L","L","W","L"] },
    { position: 18, team: "Luton", teamLogo: "", played: 27, won: 5, drawn: 5, lost: 17, goalsFor: 35, goalsAgainst: 54, goalDifference: -19, points: 20, form: ["L","D","L","L","L"] },
    { position: 19, team: "Burnley", teamLogo: "", played: 28, won: 3, drawn: 5, lost: 20, goalsFor: 25, goalsAgainst: 60, goalDifference: -35, points: 14, form: ["L","L","L","D","L"] },
    { position: 20, team: "Sheffield Utd", teamLogo: "", played: 28, won: 3, drawn: 5, lost: 20, goalsFor: 22, goalsAgainst: 72, goalDifference: -50, points: 14, form: ["L","L","D","L","L"] },
  ]
  return NextResponse.json({ standings })
}
