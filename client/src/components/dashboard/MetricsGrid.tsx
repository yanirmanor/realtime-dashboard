import {
  Activity,
  AlertTriangle,
  Bot,
  Timer,
} from 'lucide-react'
import { useMetricsStore } from '../../features/metrics/store/metrics.store'
import { MetricCard } from './MetricCard'

export function MetricsGrid() {
  const events = useMetricsStore((state) => state.events)

  const fraudAlerts = events.filter(
    (event) => event.eventType === 'fraud_alert',
  ).length

  const avgProcessingTime = events.length
    ? Math.round(
        events.reduce((sum, event) => sum + event.durationMs, 0) /
          events.length,
      )
    : 0

  const activeAgents = new Set(events.map((event) => event.agentName)).size

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Claims Processed"
        value={events.length}
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
