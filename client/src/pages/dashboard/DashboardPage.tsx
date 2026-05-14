import { Dashboard } from '../../components/dashboard/Dashboard'
import { AppShell } from '../../components/layout/AppShell'
import { Header } from '../../components/layout/Header'
import { useMetricsSocket } from '../../features/metrics/sockets/useMetricsSocket'

export function DashboardPage() {
  useMetricsSocket()

  return (
    <AppShell>
      <Header />
      <Dashboard />
    </AppShell>
  )
}
