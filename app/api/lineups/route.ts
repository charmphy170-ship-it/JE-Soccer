import { NextResponse } from "next/server"
export async function GET() {
  return NextResponse.json({
    lineup: {
      home: [
        { name: "Ederson", number: 31, position: "GK", isSubstitute: false },
        { name: "Walker", number: 2, position: "DEF", isSubstitute: false },
        { name: "Dias", number: 3, position: "DEF", isSubstitute: false },
        { name: "Akanji", number: 25, position: "DEF", isSubstitute: false },
        { name: "Gvardiol", number: 24, position: "DEF", isSubstitute: false },
        { name: "Rodri", number: 16, position: "MID", isSubstitute: false },
        { name: "De Bruyne", number: 17, position: "MID", isSubstitute: false },
        { name: "Foden", number: 47, position: "MID", isSubstitute: false },
        { name: "Silva", number: 20, position: "MID", isSubstitute: false },
        { name: "Doku", number: 11, position: "FWD", isSubstitute: false },
        { name: "Haaland", number: 9, position: "FWD", isSubstitute: false },
      ],
      away: [
        { name: "Raya", number: 22, position: "GK", isSubstitute: false },
        { name: "White", number: 4, position: "DEF", isSubstitute: false },
        { name: "Saliba", number: 2, position: "DEF", isSubstitute: false },
        { name: "Gabriel", number: 6, position: "DEF", isSubstitute: false },
        { name: "Zinchenko", number: 35, position: "DEF", isSubstitute: false },
        { name: "Rice", number: 41, position: "MID", isSubstitute: false },
        { name: "Partey", number: 5, position: "MID", isSubstitute: false },
        { name: "Odegaard", number: 8, position: "MID", isSubstitute: false },
        { name: "Saka", number: 7, position: "FWD", isSubstitute: false },
        { name: "Havertz", number: 29, position: "FWD", isSubstitute: false },
        { name: "Martinelli", number: 11, position: "FWD", isSubstitute: false },
      ],
      homeFormation: "4-3-3",
      awayFormation: "4-3-3",
    }
  })
}
