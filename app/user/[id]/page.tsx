'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { User, Friend } from "@/types"
import { supabase } from "@/lib/supabase"
import { Avatar } from "@/components/Avatar"
import { SocialLinks } from "@/components/SocialLinks"
import { MessageButton } from "@/components/MessageButton"
import { FriendButton } from "@/components/FriendButton"
import { MapPin, Trophy, Users, Activity, Star } from "lucide-react"

export default function UserProfile() {
  const { id } = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [friends, setFriends] = useState<Friend[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { if (id) fetchProfile() }, [id])

  async function fetchProfile() {
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", id).single()
    if (profile) {
      setUser(profile)
      const { data: fd } = await supabase.from("friends").select("*, friend:friend_id(*)").eq("user_id", id).eq("status", "accepted").limit(5)
      setFriends(fd || [])
    }
    setLoading(false)
  }

  if (loading) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="animate-pulse bg-je-card rounded-2xl p-8 border border-je-border">
        <div className="w-24 h-24 bg-je-surface rounded-full mx-auto mb-4" />
        <div className="h-6 bg-je-surface rounded w-1/3 mx-auto mb-2" />
        <div className="h-4 bg-je-surface rounded w-1/2 mx-auto" />
      </div>
    </div>
  )

  if (!user) return <div className="text-center py-20 text-gray-500">User not found</div>

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-6">
      {/* Profile Card */}
      <div className="bg-gradient-to-br from-je-card via-je-surface to-je-dark rounded-2xl p-8 text-center relative overflow-hidden mb-6 border border-je-border">
        <div className="absolute top-0 right-0 w-64 h-64 bg-je-neon/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <Avatar user={user} size="xl" className="mx-auto mb-4 border-3 border-je-neon/30" />
          <h1 className="text-2xl font-black text-white mb-1">{user.display_name}</h1>
          <p className="text-je-neon text-sm font-bold mb-4">@{user.username}</p>
          <div className="flex items-center justify-center gap-3 text-gray-400 text-sm mb-6">
            {user.position && <span className="flex items-center gap-1"><Trophy className="w-3.5 h-3.5 text-je-yellow" />{user.position}</span>}
            {user.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-je-cyan" />{user.location}</span>}
            {user.favorite_team && <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-je-hot" />{user.favorite_team}</span>}
          </div>

          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-2xl font-black text-je-neon">{user.matches_played}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">matches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-je-neon">{user.goals_scored}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">goals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-je-neon">{user.assists}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">assists</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-je-neon">{friends.length}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">friends</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <MessageButton userId={user.id} />
            <FriendButton userId={user.id} />
          </div>
        </div>
      </div>

      <SocialLinks user={user} />

      {user.bio && (
        <div className="bg-je-card rounded-xl p-5 mb-4 border border-je-border">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">About</h3>
          <p className="text-sm text-gray-300">{user.bio}</p>
        </div>
      )}

      {friends.length > 0 && (
        <div className="bg-je-card rounded-xl p-5 border border-je-border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Friends</h3>
            <button className="text-je-neon text-xs font-bold hover:text-je-lime transition-colors">See all</button>
          </div>
          <div className="flex -space-x-2">
            {friends.map((f) => (
              <a key={f.friend_id} href={`/user/${f.friend_id}`} className="relative hover:z-10 transition-transform hover:scale-110">
                <Avatar user={f.friend} size="md" className="border-2 border-je-card" />
              </a>
            ))}
            {friends.length > 5 && (
              <div className="w-10 h-10 rounded-full bg-je-surface flex items-center justify-center text-xs text-gray-400 border-2 border-je-card font-bold">
                +{friends.length - 5}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
