'use client'

import { useRouter } from "next/navigation"
import { MessageCircle } from "lucide-react"

export function MessageButton({ userId }: { userId: string }) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push(`/chat/${userId}`)}
      className="flex items-center gap-2 px-5 py-2.5 bg-je-neon text-je-dark rounded-xl text-sm font-bold hover:bg-je-lime transition-colors"
    >
      <MessageCircle className="w-4 h-4" />
      Message
    </button>
  )
}
