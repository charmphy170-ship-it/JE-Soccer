import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatTime(date: string | Date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function timeAgo(date: string | Date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return "just now"
  const mins = Math.floor(seconds / 60)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return formatDate(date)
}

export function getPositionColor(position: string) {
  const map: Record<string, string> = {
    GK: "bg-je-yellow text-je-dark",
    DEF: "bg-je-blue text-white",
    MID: "bg-je-neon text-je-dark",
    FWD: "bg-je-hot text-white",
    FW: "bg-je-hot text-white",
    MF: "bg-je-neon text-je-dark",
    DF: "bg-je-blue text-white",
  }
  return map[position] || "bg-je-purple text-white"
}

export function getRatingColor(rating: number) {
  if (rating >= 8) return "text-je-neon"
  if (rating >= 6.5) return "text-je-yellow"
  if (rating >= 5) return "text-je-orange"
  return "text-je-hot"
}

export function getFormColor(result: string) {
  if (result === "W") return "bg-je-neon text-je-dark"
  if (result === "D") return "bg-je-yellow text-je-dark"
  if (result === "L") return "bg-je-hot text-white"
  return "bg-je-border text-gray-400"
}
