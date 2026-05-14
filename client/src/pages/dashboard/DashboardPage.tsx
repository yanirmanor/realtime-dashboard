import { Dashboard } from '@/features/metrics/components/Dashboard'
import { useMetricsSocket } from '@/features/metrics/sockets/useMetricsSocket'
import { AppShell } from '@/shared/layout/AppShell'
import { Header } from '@/shared/layout/Header'

export function DashboardPage() {
  useMetricsSocket()

  return (
    <AppShell>
      <Header />
      <Dashboard />
    </AppShell>
  )
}
