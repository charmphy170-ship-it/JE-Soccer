'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { Conversation } from "@/types"
import { supabase } from "@/lib/supabase"
import { Avatar } from "@/components/Avatar"
import { timeAgo } from "@/lib/utils"
import { Mail, MessageSquare } from "lucide-react"

export default function Inbox() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConversations()
    const sub = supabase.channel("messages").on("postgres_changes", { event: "INSERT", schema: "public", table: "private_messages" }, () => fetchConversations()).subscribe()
    return () => { sub.unsubscribe() }
  }, [])

  async function fetchConversations() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: messages } = await supabase.from("private_messages").select("*, sender:sender_id(*), receiver:receiver_id(*)").or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`).order("created_at", { ascending: false })
    if (!messages) return
    const convoMap = new Map<string, Conversation>()
    messages.forEach((msg: any) => {
      const other = msg.sender_id === user.id ? msg.receiver : msg.sender
      if (!convoMap.has(other.id)) {
        const unread = messages.filter((m: any) => m.sender_id === other.id && !m.read).length
        convoMap.set(other.id, { user: other, lastMessage: msg, unreadCount: unread })
      }
    })
    setConversations(Array.from(convoMap.values()))
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <h1 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
        <Mail className="w-6 h-6 text-je-neon" /> Inbox
      </h1>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="bg-je-card rounded-xl p-4 border border-je-border shimmer flex gap-3 h-16" />)}
        </div>
      ) : conversations.length === 0 ? (
        <div className="bg-je-card rounded-xl p-12 text-center border border-je-border">
          <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500">No messages yet</p>
          <p className="text-gray-600 text-sm mt-1">Start a conversation from a user's profile</p>
        </div>
      ) : (
        <div className="space-y-2">
          {conversations.map((c) => (
            <Link key={c.user.id} href={`/chat/${c.user.id}`}
              className="bg-je-card rounded-xl p-4 flex items-center gap-4 hover:bg-je-surface transition-colors border border-je-border">
              <Avatar user={c.user} size="md" showStatus />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm truncate">{c.user.display_name}</h3>
                  <span className="text-[10px] text-gray-500">{timeAgo(c.lastMessage.created_at)}</span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {c.lastMessage.sender_id === c.user.id ? "" : "You: "}{c.lastMessage.content}
                </p>
              </div>
              {c.unreadCount > 0 && (
                <span className="bg-je-neon text-je-dark text-xs font-black px-2 py-0.5 rounded-full min-w-[20px] text-center">{c.unreadCount}</span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
