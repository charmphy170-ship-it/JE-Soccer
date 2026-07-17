interface SectionHeaderProps {
  title: string
  subtitle?: string
  action?: { label: string; href: string }
  icon?: React.ReactNode
}

export function SectionHeader({ title, subtitle, action, icon }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {icon && <span className="text-je-neon">{icon}</span>}
        <div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
      {action && (
        <a href={action.href} className="text-xs font-medium text-je-neon hover:text-je-electric transition-colors">
          {action.label} →
        </a>
      )}
    </div>
  )
}
