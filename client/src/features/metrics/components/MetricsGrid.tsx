import {
  Activity,
  AlertTriangle,
  Bot,
  Timer,
} from 'lucide-react'
import { useMetricStats } from '@/features/metrics/hooks/useMetricStats'
import { MetricCard } from './MetricCard'

export function MetricsGrid() {
  const {
    claimsProcessed,
    fraudAlerts,
    avgProcessingTime,
    activeAgents,
  } = useMetricStats()

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Claims Processed"
        value={claimsProcessed}
        description="Latest 100 live events"
        icon={Activity}
      />

      <MetricCard
        title="Fraud Alerts"
        value={fraudAlerts}
        description="Events flagged for review"
        icon={AlertTriangle}
      />

      <MetricCard
        title="Avg Processing Time"
        value={avgProcessingTime}
        suffix="ms"
        animationDuration={0.9}
        description="Average workflow duration"
        icon={Timer}
      />

      <MetricCard
        title="Active AI Agents"
        value={activeAgents}
        description="Agents seen in live stream"
        icon={Bot}
      />
    </section>
  )
}
