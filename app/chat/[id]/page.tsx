'use client'

import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { PrivateMessage, User } from "@/types"
import { supabase } from "@/lib/supabase"
import { Avatar } from "@/components/Avatar"
import { ArrowLeft, Send } from "lucide-react"

export default function Chat() {
  const { id } = useParams()
  const [messages, setMessages] = useState<PrivateMessage[]>([])
  const [otherUser, setOtherUser] = useState<User | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [currentUserId, setCurrentUserId] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchCurrentUser()
    fetchOtherUser()
    fetchMessages()
    markAsRead()
    const sub = supabase.channel(`chat-${id}`).on("postgres_changes", { event: "INSERT", schema: "public", table: "private_messages" }, (payload) => {
      const msg = payload.new as PrivateMessage
      if ((msg.sender_id === id && msg.receiver_id === currentUserId) || (msg.sender_id === currentUserId && msg.receiver_id === id)) {
        setMessages(prev => [...prev, msg])
        markAsRead()
      }
    }).subscribe()
    return () => { sub.unsubscribe() }
  }, [id, currentUserId])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

  async function fetchCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) setCurrentUserId(user.id)
  }

  async function fetchOtherUser() {
    const { data } = await supabase.from("profiles").select("*").eq("id", id).single()
    if (data) setOtherUser(data)
  }

  async function fetchMessages() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase.from("private_messages").select("*").or(`and(sender_id.eq.${user.id},receiver_id.eq.${id}),and(sender_id.eq.${id},receiver_id.eq.${user.id})`).order("created_at", { ascending: true })
    if (data) setMessages(data)
  }

  async function markAsRead() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from("private_messages").update({ read: true }).eq("sender_id", id).eq("receiver_id", user.id).eq("read", false)
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!newMessage.trim() || !currentUserId) return
    const { error } = await supabase.from("private_messages").insert({ sender_id: currentUserId, receiver_id: id, content: newMessage.trim(), read: false })
    if (!error) setNewMessage("")
  }

  if (!otherUser) return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-64px)] flex flex-col">
      <div className="bg-je-card border-b border-je-border px-4 py-3 flex items-center gap-3">
        <Link href="/inbox" className="p-2 hover:bg-je-surface rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </Link>
        <Link href={`/user/${otherUser.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Avatar user={otherUser} size="sm" showStatus />
          <div>
            <h2 className="font-bold text-white text-sm">{otherUser.display_name}</h2>
            <p className="text-[10px] text-gray-500">@{otherUser.username}</p>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-je-darker">
        {messages.map((msg) => {
          const isMe = msg.sender_id === currentUserId
          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] ${isMe ? "order-2" : "order-1"}`}>
                {!isMe && <Link href={`/user/${msg.sender_id}`}><Avatar user={otherUser} size="xs" className="mb-1" /></Link>}
                <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                  isMe ? "bg-je-neon text-je-dark rounded-br-md font-medium" : "bg-je-card text-white rounded-bl-md border border-je-border"
                }`}>
                  {msg.content}
                </div>
                <span className={`text-[10px] text-gray-600 mt-1 block ${isMe ? "text-right" : ""}`}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={sendMessage} className="bg-je-card border-t border-je-border px-4 py-3 flex gap-2">
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..."
          className="flex-1 px-4 py-2.5 bg-je-surface rounded-full text-sm text-white placeholder-gray-500 border border-je-border focus:border-je-neon focus:outline-none transition-colors" />
        <button type="submit" disabled={!newMessage.trim()} className="p-2.5 bg-je-neon text-je-dark rounded-full hover:bg-je-lime disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}
