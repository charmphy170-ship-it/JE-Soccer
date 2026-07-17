# JE Soccer ⚽

The ultimate soccer platform. Live scores, player stats, match predictions, fantasy football, transfers, private messaging, and more.

## Features

- **Live & Upcoming Matches** — Real-time ESPN API data
- **Match Details** — Lineups, stats, events, odds, predictions
- **Player Stats** — Detailed performance metrics and leaderboards
- **League Standings** — Tables with form guides
- **Transfer Tracker** — Latest moves across Europe
- **Match Predictions** — AI-powered predictions + user prediction game
- **Fantasy Football** — Build your dream XI, compete on leaderboard
- **News Feed** — Breaking stories from top sources
- **Lineup Builder** — Visual pitch builder
- **Friend System** — Add friends, accept requests
- **Private Chat** — Real-time messaging with Supabase
- **Social Links** — X/Twitter, TikTok, Telegram integration
- **User Profiles** — Customizable with stats and socials

## Tech Stack

- Next.js 14 + React 18 + TypeScript
- Tailwind CSS (neon green dark theme)
- Supabase (Auth, Database, Real-time)
- ESPN API (no key required)

## Bright Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Neon Green | `#39FF14` | Primary accent, buttons, highlights |
| Lime | `#CCFF00` | Hover states, secondary accent |
| Electric | `#00FF88` | Gradients, success states |
| Cyan | `#00F0FF` | Info, links, secondary highlights |
| Hot Pink | `#FF3366` | Live indicators, danger |
| Orange | `#FF9500` | Warnings, transfers |
| Yellow | `#FFD700` | Champions, top rated |
| Purple | `#B829DD` | News, special features |

## Setup

```bash
# 1. Clone & install
git clone <your-repo-url>
cd je-soccer
npm install

# 2. Set up Supabase
# - Run `supabase-setup.sql` in your Supabase SQL Editor
# - Copy URL + anon key to `.env.local`

# 3. Run
cp .env.local.example .env.local
# Fill in your Supabase credentials
npm run dev
```

## Your Social Links

- **X/Twitter:** [@JEsoccerr](https://x.com/JEsoccerr)
- **TikTok:** [@jesoccerr](https://www.tiktok.com/@jesoccerr)
- **Telegram:** [t.me/+zR6WL6MCW8tiOGM8](https://t.me/+zR6WL6MCW8tiOGM8)

## Project Structure

```
je-soccer/
├── app/
│   ├── api/           # API routes (ESPN, mock data)
│   ├── match/[id]/    # Match detail page
│   ├── league/[id]/   # League standings
│   ├── player/[id]/   # Player profile
│   ├── team/[id]/     # Team profile
│   ├── schedule/      # Full fixture list
│   ├── predictions/   # Prediction game
│   ├── fantasy/       # Fantasy football
│   ├── stats/         # Player stats
│   ├── news/          # News feed
│   ├── transfer/      # Transfer tracker
│   ├── lineups/       # Lineup builder
│   ├── leaderboard/   # Global rankings
│   ├── user/[id]/     # User profiles
│   ├── inbox/         # Chat inbox
│   ├── chat/[id]/     # Private chat
│   ├── friends/       # Friend management
│   ├── settings/      # User settings
│   ├── auth/          # Login/register
│   └── page.tsx       # Home dashboard
├── components/        # Reusable components
├── lib/              # Supabase client, utils
├── types/            # TypeScript types
└── supabase-setup.sql # Database schema
```

## License

MIT
