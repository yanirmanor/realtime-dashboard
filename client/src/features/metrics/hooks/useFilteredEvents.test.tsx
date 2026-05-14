import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createMetricEvent } from '../../../test/fixtures'
import { useMetricsStore } from '../store/metrics.store'
import { useFilteredEvents } from './useFilteredEvents'

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

describe('useFilteredEvents', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    resetStore()
  })

  it('filters by status after debounce', () => {
    useMetricsStore.setState({
      events: [
        createMetricEvent({ id: '1', status: 'approved' }),
        createMetricEvent({ id: '2', status: 'rejected' }),
      ],
      selectedStatus: 'approved',
    })

    const { result } = renderHook(() => useFilteredEvents())
    act(() => {
      vi.advanceTimersByTime(220)
    })

    expect(result.current).toHaveLength(1)
    expect(result.current[0]?.status).toBe('approved')
  })

  it('filters by search text across fields after debounce', async () => {
    useMetricsStore.setState({
      events: [
        createMetricEvent({ id: '1', claimId: 'CLM-1001', agentName: 'Ava' }),
        createMetricEvent({ id: '2', claimId: 'CLM-2002', agentName: 'Noah' }),
      ],
    })

    const { result } = renderHook(() => useFilteredEvents())

    act(() => {
      useMetricsStore.getState().setSearchQuery('noah')
    })

    await act(async () => {
      await vi.advanceTimersByTimeAsync(220)
    })

    expect(result.current).toHaveLength(1)
    expect(result.current[0]?.agentName).toBe('Noah')
  })
})
