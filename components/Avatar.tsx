import { User } from "@/types"

interface AvatarProps {
  user?: User | null
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
  showStatus?: boolean
}

const sizeMap = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
  xl: "w-20 h-20 text-xl",
}

export function Avatar({ user, size = "md", className = "", showStatus = false }: AvatarProps) {
  const initials = user?.display_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "?"

  const colors = [
    "bg-gradient-to-br from-je-hot to-je-orange",
    "bg-gradient-to-br from-je-blue to-je-cyan",
    "bg-gradient-to-br from-je-neon to-je-electric",
    "bg-gradient-to-br from-je-yellow to-je-orange",
    "bg-gradient-to-br from-je-purple to-je-hot",
    "bg-gradient-to-br from-je-cyan to-je-blue",
  ]
  const colorIndex = user?.id ? user.id.charCodeAt(0) % colors.length : 0

  return (
    <div className="relative inline-block">
      {user?.avatar_url ? (
        <img
          src={user.avatar_url}
          alt={user.display_name || "User"}
          className={`${sizeMap[size]} rounded-full object-cover border-2 border-je-border ${className}`}
        />
      ) : (
        <div
          className={`${sizeMap[size]} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white font-bold border-2 border-je-border ${className}`}
        >
          {initials}
        </div>
      )}
      {showStatus && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-je-neon rounded-full border-2 border-je-darker animate-pulse" />
      )}
    </div>
  )
}
