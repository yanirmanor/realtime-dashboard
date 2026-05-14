import { useMemo } from 'react'
import { useMetricsStore } from '@/features/metrics/store/metrics.store'

export function useMetricStats() {
  const events = useMetricsStore((state) => state.events)

  return useMemo(() => {
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

    return {
      claimsProcessed: events.length,
      fraudAlerts,
      avgProcessingTime,
      activeAgents,
    }
  }, [events])
}
