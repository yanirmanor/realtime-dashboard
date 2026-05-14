import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { createMetricEvent } from '@/test/fixtures'
import { useMetricsStore } from '@/features/metrics/store/metrics.store'
import { useMetricStats } from './useMetricStats'

function resetStore() {
  useMetricsStore.setState({
    events: [],
    selectedEvent: null,
    connectionStatus: 'disconnected',
    isStreaming: true,
    selectedStatus: 'all',
    searchQuery: '',
  })
}

describe('useMetricStats', () => {
  beforeEach(() => {
    resetStore()
  })

  it('calculates aggregate metrics from events', () => {
    useMetricsStore.setState({
      events: [
        createMetricEvent({
          id: '1',
          eventType: 'fraud_alert',
          durationMs: 500,
          agentName: 'Ava',
        }),
        createMetricEvent({
          id: '2',
          durationMs: 300,
          agentName: 'Noah',
        }),
      ],
    })

    const { result } = renderHook(() => useMetricStats())

    expect(result.current).toEqual({
      claimsProcessed: 2,
      fraudAlerts: 1,
      avgProcessingTime: 400,
      activeAgents: 2,
    })
  })
})
