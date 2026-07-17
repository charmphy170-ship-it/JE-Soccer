'use client'

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { UserPlus, UserCheck, Clock, Check } from "lucide-react"

export function FriendButton({ userId }: { userId: string }) {
  const [status, setStatus] = useState<"none" | "pending" | "accepted" | "incoming">("none")
  const [currentUserId, setCurrentUserId] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => { checkFriendStatus() }, [userId])

  async function checkFriendStatus() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    setCurrentUserId(user.id)
    if (user.id === userId) { setLoading(false); return }

    const { data: existing } = await supabase
      .from("friends").select("*").eq("user_id", user.id).eq("friend_id", userId).single()
    if (existing) {
      if (existing.status === "accepted") setStatus("accepted")
      else setStatus("pending")
    } else {
      const { data: incoming } = await supabase
        .from("friends").select("*").eq("user_id", userId).eq("friend_id", user.id).eq("status", "pending").single()
      if (incoming) setStatus("incoming")
    }
    setLoading(false)
  }

  async function sendRequest() {
    await supabase.from("friends").insert([
      { user_id: currentUserId, friend_id: userId, status: "pending" },
      { user_id: userId, friend_id: currentUserId, status: "pending" },
    ])
    setStatus("pending")
  }

  async function acceptRequest() {
    await supabase.from("friends").update({ status: "accepted" }).eq("user_id", userId).eq("friend_id", currentUserId)
    await supabase.from("friends").update({ status: "accepted" }).eq("user_id", currentUserId).eq("friend_id", userId)
    setStatus("accepted")
  }

  if (loading || currentUserId === userId) return null

  if (status === "accepted") return (
    <button className="flex items-center gap-2 px-5 py-2.5 border border-je-neon/30 text-je-neon rounded-xl text-sm font-bold bg-je-neon/10">
      <UserCheck className="w-4 h-4" /> Friends
    </button>
  )
  if (status === "pending") return (
    <button className="flex items-center gap-2 px-5 py-2.5 border border-je-border text-gray-500 rounded-xl text-sm font-bold">
      <Clock className="w-4 h-4" /> Pending
    </button>
  )
  if (status === "incoming") return (
    <button onClick={acceptRequest} className="flex items-center gap-2 px-5 py-2.5 bg-je-neon text-je-dark rounded-xl text-sm font-bold hover:bg-je-lime transition-colors">
      <Check className="w-4 h-4" /> Accept
    </button>
  )

  return (
    <button onClick={sendRequest} className="flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">
      <UserPlus className="w-4 h-4" /> Add Friend
    </button>
  )
}
