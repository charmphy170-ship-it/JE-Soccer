'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, MessageSquare, Trophy, BarChart3, Newspaper, Calendar, Settings, Zap } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/schedule", label: "Schedule", icon: Calendar },
    { href: "/predictions", label: "Predict", icon: Zap },
    { href: "/fantasy", label: "Fantasy", icon: Trophy },
    { href: "/stats", label: "Stats", icon: BarChart3 },
    { href: "/news", label: "News", icon: Newspaper },
    { href: "/friends", label: "Friends", icon: Users },
    { href: "/inbox", label: "Chat", icon: MessageSquare },
  ]

  return (
    <nav className="sticky top-0 z-50 glass border-b border-je-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-je-neon to-je-electric flex items-center justify-center group-hover:neon-glow transition-all">
              <span className="text-je-dark font-bold text-sm">JE</span>
            </div>
            <span className="font-bold text-xl tracking-tight">
              <span className="text-white">Soccer</span>
              <span className="text-je-neon">Hub</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-je-neon/10 text-je-neon"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/inbox" className="p-2 text-gray-400 hover:text-je-neon transition-colors">
              <MessageSquare className="w-5 h-5" />
            </Link>
            <Link href="/friends" className="p-2 text-gray-400 hover:text-je-neon transition-colors">
              <Users className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-je-border z-50">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-xs ${
                  isActive ? "text-je-neon" : "text-gray-500"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
