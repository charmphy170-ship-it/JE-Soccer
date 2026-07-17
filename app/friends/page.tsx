'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { Friend, User } from "@/types"
import { supabase } from "@/lib/supabase"
import { Avatar } from "@/components/Avatar"
import { Check, X, UserPlus, Users, Clock, Search } from "lucide-react"

type Tab = "friends" | "requests" | "find"

export default function Friends() {
  const [activeTab, setActiveTab] = useState<Tab>("friends")
  const [friends, setFriends] = useState<Friend[]>([])
  const [requests, setRequests] = useState<Friend[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [currentUserId, setCurrentUserId] = useState("")

  useEffect(() => { fetchCurrentUser() }, [])
  useEffect(() => { if (currentUserId) { fetchFriends(); fetchRequests() } }, [currentUserId, activeTab])

  async function fetchCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) setCurrentUserId(user.id)
  }

  async function fetchFriends() {
    const { data } = await supabase.from("friends").select("*, friend:friend_id(*)").eq("user_id", currentUserId).eq("status", "accepted")
    setFriends(data || [])
  }

  async function fetchRequests() {
    const { data } = await supabase.from("friends").select("*, user:user_id(*)").eq("friend_id", currentUserId).eq("status", "pending")
    setRequests(data || [])
  }

  async function searchUsers() {
    if (!searchQuery.trim()) return
    const { data } = await supabase.from("profiles").select("*").ilike("username", `%${searchQuery}%`).neq("id", currentUserId).limit(10)
    setSearchResults(data || [])
  }

  async function sendRequest(friendId: string) {
    await supabase.from("friends").insert([{ user_id: currentUserId, friend_id: friendId, status: "pending" }, { user_id: friendId, friend_id: currentUserId, status: "pending" }])
    setSearchResults(prev => prev.filter(u => u.id !== friendId))
  }

  async function acceptRequest(requestId: string, friendId: string) {
    await supabase.from("friends").update({ status: "accepted" }).eq("id", requestId)
    const { data: rec } = await supabase.from("friends").select("id").eq("user_id", friendId).eq("friend_id", currentUserId).single()
    if (rec) await supabase.from("friends").update({ status: "accepted" }).eq("id", rec.id)
    fetchRequests(); fetchFriends()
  }

  async function rejectRequest(requestId: string) {
    await supabase.from("friends").delete().eq("id", requestId)
    fetchRequests()
  }

  const tabs = [
    { id: "friends" as Tab, label: "Friends", icon: Users },
    { id: "requests" as Tab, label: "Requests", icon: Clock },
    { id: "find" as Tab, label: "Find", icon: UserPlus },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <h1 className="text-2xl font-black text-white mb-6">Friends</h1>

      <div className="flex gap-1 bg-je-card rounded-xl p-1 mb-6 border border-je-border">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab.id ? "bg-je-neon text-je-dark" : "text-gray-500 hover:text-white"
              }`}>
              <Icon className="w-4 h-4" />
              {tab.label}
              {tab.id === "requests" && requests.length > 0 && (
                <span className="bg-je-hot text-white text-xs px-1.5 py-0.5 rounded-full">{requests.length}</span>
              )}
            </button>
          )
        })}
      </div>

      {activeTab === "friends" && (
        <div className="space-y-2">
          {friends.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 text-gray-700" />
              <p>No friends yet</p>
              <button onClick={() => setActiveTab("find")} className="text-je-neon text-sm mt-2 hover:underline font-bold">Find people to add</button>
            </div>
          ) : (
            friends.map((f) => (
              <Link key={f.friend_id} href={`/user/${f.friend_id}`}
                className="bg-je-card rounded-xl p-4 flex items-center gap-4 hover:bg-je-surface transition-colors border border-je-border">
                <Avatar user={f.friend} size="md" />
                <div className="flex-1">
                  <h3 className="font-bold text-white text-sm">{f.friend?.display_name}</h3>
                  <p className="text-xs text-gray-500">@{f.friend?.username}</p>
                </div>
                <button onClick={(e) => { e.preventDefault(); window.location.href = `/chat/${f.friend_id}` }}
                  className="px-4 py-2 bg-je-neon/10 text-je-neon rounded-lg text-xs font-bold hover:bg-je-neon/20 transition-colors">
                  Message
                </button>
              </Link>
            ))
          )}
        </div>
      )}

      {activeTab === "requests" && (
        <div className="space-y-2">
          {requests.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-3 text-gray-700" />
              <p>No pending requests</p>
            </div>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="bg-je-card rounded-xl p-4 flex items-center gap-4 border border-je-border">
                <Link href={`/user/${req.user_id}`}><Avatar user={req.user} size="md" /></Link>
                <div className="flex-1">
                  <Link href={`/user/${req.user_id}`}><h3 className="font-bold text-white text-sm hover:text-je-neon transition-colors">{req.user?.display_name}</h3></Link>
                  <p className="text-xs text-gray-500">@{req.user?.username}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => acceptRequest(req.id, req.user_id)} className="p-2 bg-je-neon text-je-dark rounded-lg hover:bg-je-lime transition-colors">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={() => rejectRequest(req.id)} className="p-2 bg-je-surface text-gray-400 rounded-lg hover:bg-je-hot hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "find" && (
        <div>
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && searchUsers()}
                placeholder="Search by username..." className="w-full pl-10 pr-4 py-2.5 bg-je-card border border-je-border rounded-xl text-sm text-white placeholder-gray-500 focus:border-je-neon focus:outline-none transition-colors" />
            </div>
            <button onClick={searchUsers} className="px-6 py-2.5 bg-je-neon text-je-dark rounded-xl text-sm font-bold hover:bg-je-lime transition-colors">Search</button>
          </div>
          <div className="space-y-2">
            {searchResults.map((user) => (
              <div key={user.id} className="bg-je-card rounded-xl p-4 flex items-center gap-4 border border-je-border">
                <Link href={`/user/${user.id}`}><Avatar user={user} size="md" /></Link>
                <div className="flex-1">
                  <Link href={`/user/${user.id}`}><h3 className="font-bold text-white text-sm hover:text-je-neon transition-colors">{user.display_name}</h3></Link>
                  <p className="text-xs text-gray-500">@{user.username}</p>
                </div>
                <button onClick={() => sendRequest(user.id)} className="flex items-center gap-1.5 px-4 py-2 bg-je-neon/10 text-je-neon rounded-lg text-xs font-bold hover:bg-je-neon/20 transition-colors">
                  <UserPlus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
