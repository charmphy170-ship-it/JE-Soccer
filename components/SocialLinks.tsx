import { User } from "@/types"

interface SocialLinksProps {
  user: User
}

export function SocialLinks({ user }: SocialLinksProps) {
  const links = [
    {
      name: "X",
      url: user.twitter_url,
      bg: "bg-white",
      text: "text-black",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: "TikTok",
      url: user.tiktok_url,
      bg: "bg-black",
      text: "text-white",
      border: "border border-je-hot",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.3 0 .59.05.86.13v-3.5a6.36 6.36 0 0 0-.86-.06A6.34 6.34 0 0 0 2.5 15.7a6.34 6.34 0 0 0 6.37 6.34 6.34 6.34 0 0 0 6.37-6.34V8.83a8.23 8.23 0 0 0 4.83 1.55V7.03a4.85 4.85 0 0 1-.48-.34z"/>
        </svg>
      ),
    },
    {
      name: "Telegram",
      url: user.telegram_url,
      bg: "bg-[#229ED9]",
      text: "text-white",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
    },
  ]

  const hasLinks = links.some((l) => l.url)
  if (!hasLinks) return null

  return (
    <div className="bg-je-card rounded-xl p-4 border border-je-border">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Social Links</h3>
      <div className="flex flex-wrap gap-2">
        {links.map((link) =>
          link.url ? (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-3.5 py-2 ${link.bg} ${link.text} ${link.border || ""} rounded-lg text-xs font-bold hover:scale-105 transition-transform`}
            >
              {link.icon}
              {link.name === "X" && link.url.includes("x.com/")
                ? `@${link.url.split("x.com/")[1]}`
                : link.name === "TikTok" && link.url.includes("tiktok.com/@")
                ? `@${link.url.split("tiktok.com/@")[1]}`
                : link.name}
            </a>
          ) : null
        )}
      </div>
    </div>
  )
}
