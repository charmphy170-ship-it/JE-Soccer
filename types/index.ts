export interface User {
  id: string;
  email: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  position?: string;
  location?: string;
  bio?: string;
  favorite_team?: string;
  twitter_url?: string;
  tiktok_url?: string;
  telegram_url?: string;
  matches_played: number;
  goals_scored: number;
  assists: number;
  rating: number;
  created_at: string;
}

export interface Friend {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted' | 'blocked';
  created_at: string;
  friend?: User;
  user?: User;
}

export interface PrivateMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
  sender?: User;
}

export interface Conversation {
  user: User;
  lastMessage: PrivateMessage;
  unreadCount: number;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'POSTPONED';
  date: string;
  competition: string;
  venue?: string;
  homeLogo?: string;
  awayLogo?: string;
  displayClock?: string;
  period?: number;
  odds?: MatchOdds;
  predictions?: MatchPrediction;
  lineup?: Lineup;
  events?: MatchEvent[];
}

export interface MatchOdds {
  homeWin: number;
  draw: number;
  awayWin: number;
  over25: number;
  under25: number;
  btts: number;
}

export interface MatchPrediction {
  homeWinProb: number;
  drawProb: number;
  awayWinProb: number;
  predictedScore: string;
  confidence: number;
}

export interface MatchEvent {
  time: string;
  type: 'goal' | 'card' | 'substitution' | 'penalty';
  player: string;
  team: 'home' | 'away';
  detail?: string;
}

export interface Lineup {
  home: PlayerInLineup[];
  away: PlayerInLineup[];
  homeFormation: string;
  awayFormation: string;
}

export interface PlayerInLineup {
  name: string;
  number: number;
  position: string;
  isSubstitute: boolean;
}

export interface Player {
  id: string;
  name: string;
  team: string;
  teamLogo?: string;
  position: string;
  age: number;
  nationality: string;
  photo?: string;
  stats: PlayerStats;
  rating: number;
  marketValue?: string;
}

export interface PlayerStats {
  matches: number;
  goals: number;
  assists: number;
  minutes: number;
  passes: number;
  passAccuracy: number;
  shots: number;
  shotsOnTarget: number;
  tackles: number;
  interceptions: number;
  yellowCards: number;
  redCards: number;
  cleanSheets?: number;
  saves?: number;
}

export interface League {
  id: string;
  name: string;
  country: string;
  logo?: string;
  season: string;
  standings: TeamStanding[];
}

export interface TeamStanding {
  position: number;
  team: string;
  teamLogo?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  image?: string;
  source: string;
  publishedAt: string;
  category: string;
  url?: string;
}

export interface Transfer {
  id: string;
  playerName: string;
  playerPhoto?: string;
  fromTeam: string;
  fromTeamLogo?: string;
  toTeam: string;
  toTeamLogo?: string;
  fee: string;
  date: string;
  type: 'permanent' | 'loan' | 'free';
}

export interface FantasyTeam {
  id: string;
  userId: string;
  name: string;
  players: FantasyPlayer[];
  totalPoints: number;
  gameweekPoints: number;
  budget: number;
  rank: number;
}

export interface FantasyPlayer {
  playerId: string;
  name: string;
  position: string;
  team: string;
  price: number;
  points: number;
  isCaptain: boolean;
  isViceCaptain: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  points: number;
  correctPredictions: number;
  streak: number;
}
