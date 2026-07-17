export function LiveIndicator({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "w-1.5 h-1.5", md: "w-2 h-2", lg: "w-3 h-3" }
  return (
    <span className="flex items-center gap-1.5">
      <span className={`relative flex ${sizes[size]}`}>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-je-hot opacity-75" />
        <span className="relative inline-flex rounded-full h-full w-full bg-je-hot" />
      </span>
      <span className={`font-bold text-je-hot ${size === "sm" ? "text-[10px]" : "text-xs"}`}>LIVE</span>
    </span>
  )
}
