'use client'

import { useState } from "react"
import { SectionHeader } from "@/components/SectionHeader"
import { Settings, Bell, Shield, Globe, Palette } from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <SectionHeader title="Settings" subtitle="Customize your JE Soccer experience" icon={<Settings className="w-5 h-5 text-je-neon" />} />

      <div className="space-y-4">
        <SettingCard icon={<Bell className="w-5 h-5 text-je-cyan" />} title="Notifications" description="Get alerts for goals, match starts, and friend requests">
          <button onClick={() => setNotifications(!notifications)} className={`w-12 h-6 rounded-full transition-colors ${notifications ? "bg-je-neon" : "bg-je-border"}`}>
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications ? "translate-x-6" : "translate-x-0.5"}`} />
          </button>
        </SettingCard>

        <SettingCard icon={<Palette className="w-5 h-5 text-je-purple" />} title="Dark Mode" description="Toggle between dark and light themes">
          <button onClick={() => setDarkMode(!darkMode)} className={`w-12 h-6 rounded-full transition-colors ${darkMode ? "bg-je-neon" : "bg-je-border"}`}>
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${darkMode ? "translate-x-6" : "translate-x-0.5"}`} />
          </button>
        </SettingCard>

        <SettingCard icon={<Globe className="w-5 h-5 text-je-yellow" />} title="Language" description="Change your preferred language">
          <span className="text-sm text-gray-400">English</span>
        </SettingCard>

        <SettingCard icon={<Shield className="w-5 h-5 text-je-hot" />} title="Privacy" description="Manage your data and privacy settings">
          <span className="text-sm text-je-neon">Manage →</span>
        </SettingCard>
      </div>

      <div className="mt-8 bg-je-card rounded-xl p-5 border border-je-border">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Connected Accounts</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z"/></svg>
              </div>
              <div>
                <div className="text-sm font-bold text-white">X / Twitter</div>
                <div className="text-xs text-gray-500">@JEsoccerr</div>
              </div>
            </div>
            <span className="text-xs text-je-neon font-bold">Connected</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center border border-je-hot">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.3 0 .59.05.86.13v-3.5a6.36 6.36 0 0 0-.86-.06A6.34 6.34 0 0 0 2.5 15.7a6.34 6.34 0 0 0 6.37 6.34 6.34 6.34 0 0 0 6.37-6.34V8.83a8.23 8.23 0 0 0 4.83 1.55V7.03a4.85 4.85 0 0 1-.48-.34z"/></svg>
              </div>
              <div>
                <div className="text-sm font-bold text-white">TikTok</div>
                <div className="text-xs text-gray-500">@jesoccerr</div>
              </div>
            </div>
            <span className="text-xs text-je-neon font-bold">Connected</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#229ED9] rounded-lg flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </div>
              <div>
                <div className="text-sm font-bold text-white">Telegram</div>
                <div className="text-xs text-gray-500">JE Soccer Group</div>
              </div>
            </div>
            <span className="text-xs text-je-neon font-bold">Connected</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingCard({ icon, title, description, children }: any) {
  return (
    <div className="bg-je-card rounded-xl p-4 border border-je-border flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-je-surface rounded-lg flex items-center justify-center">{icon}</div>
        <div>
          <h3 className="text-sm font-bold text-white">{title}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      {children}
    </div>
  )
}
