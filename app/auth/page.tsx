'use client'

import { useState } from "react"
import Link from "next/link"
import { Zap, Mail, Lock, User, ArrowRight } from "lucide-react"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login")

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-je-neon to-je-electric rounded-2xl flex items-center justify-center mx-auto mb-4 neon-glow">
            <Zap className="w-8 h-8 text-je-dark" />
          </div>
          <h1 className="text-3xl font-black text-white">JE <span className="gradient-text">Soccer</span></h1>
          <p className="text-gray-500 text-sm mt-2">{mode === "login" ? "Welcome back!" : "Join the community"}</p>
        </div>

        <div className="bg-je-card rounded-2xl p-6 border border-je-border">
          <div className="flex gap-1 bg-je-surface rounded-xl p-1 mb-6">
            <button onClick={() => setMode("login")} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${mode === "login" ? "bg-je-neon text-je-dark" : "text-gray-400"}`}>Sign In</button>
            <button onClick={() => setMode("register")} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${mode === "register" ? "bg-je-neon text-je-dark" : "text-gray-400"}`}>Sign Up</button>
          </div>

          <form className="space-y-4">
            {mode === "register" && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" placeholder="Username" className="w-full pl-10 pr-4 py-3 bg-je-surface rounded-xl text-sm text-white border border-je-border focus:border-je-neon focus:outline-none transition-colors" />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="email" placeholder="Email" className="w-full pl-10 pr-4 py-3 bg-je-surface rounded-xl text-sm text-white border border-je-border focus:border-je-neon focus:outline-none transition-colors" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="password" placeholder="Password" className="w-full pl-10 pr-4 py-3 bg-je-surface rounded-xl text-sm text-white border border-je-border focus:border-je-neon focus:outline-none transition-colors" />
            </div>
            <button type="submit" className="w-full py-3 bg-je-neon text-je-dark rounded-xl font-bold text-sm hover:bg-je-lime transition-colors flex items-center justify-center gap-2">
              {mode === "login" ? "Sign In" : "Create Account"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-gray-500 hover:text-je-neon transition-colors">Continue as guest</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
