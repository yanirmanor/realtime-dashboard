import type { ReactNode } from 'react'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#e2e2e8]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-5 py-5 md:px-8">
        {children}
      </div>
    </div>
  )
}
