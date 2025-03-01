import type React from "react"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen">
      {/* Main content area - White background */}
      <div className="flex-1 bg-white">
        <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
      </div>
    </div>
  )
}

