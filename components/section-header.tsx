interface SectionHeaderProps {
  kicker: string
  title: string
  description: string
}

export function SectionHeader({ kicker, title, description }: SectionHeaderProps) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
      <div className="inline-block">
        <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          {kicker}
        </span>
      </div>
      <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-balance">{title}</h2>
      <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{description}</p>
    </div>
  )
}
