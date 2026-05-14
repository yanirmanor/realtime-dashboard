import { beforeEach, describe, expect, it } from 'vitest'
import { createMetricEvent } from '../../../test/fixtures'
import { useMetricsStore } from './metrics.store'

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

describe('metrics store', () => {
  beforeEach(() => {
    resetStore()
  })

  it('adds newest events first and keeps last 100', () => {
    const addEvent = useMetricsStore.getState().addEvent

    for (let i = 0; i < 120; i += 1) {
      addEvent(createMetricEvent({ id: `evt-${i}`, claimId: `CLM-${i}` }))
    }

    const events = useMetricsStore.getState().events
    expect(events).toHaveLength(100)
    expect(events[0]?.id).toBe('evt-119')
    expect(events[99]?.id).toBe('evt-20')
  })

  it('supports selecting and closing event details', () => {
    const event = createMetricEvent()
    const { selectEvent, closeEventDetails } = useMetricsStore.getState()

    selectEvent(event)
    expect(useMetricsStore.getState().selectedEvent).toEqual(event)

    closeEventDetails()
    expect(useMetricsStore.getState().selectedEvent).toBeNull()
  })

  it('updates filters and connection state', () => {
    const { setConnectionStatus, setIsStreaming, setSelectedStatus, setSearchQuery } = useMetricsStore.getState()

    setConnectionStatus('connected')
    setIsStreaming(false)
    setSelectedStatus('approved')
    setSearchQuery('agent')

    const state = useMetricsStore.getState()
    expect(state.connectionStatus).toBe('connected')
    expect(state.isStreaming).toBe(false)
    expect(state.selectedStatus).toBe('approved')
    expect(state.searchQuery).toBe('agent')
  })
})
