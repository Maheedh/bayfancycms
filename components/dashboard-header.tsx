interface DashboardHeaderProps {
  heading: string
  description?: string
}

export function DashboardHeader({ heading, description }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-2 pb-8 border-b">
      <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  )
}

