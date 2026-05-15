import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createMetricEvent } from '@/test/fixtures'
import { useMetricsStore } from '@/features/metrics/store/metrics.store'
import { metricsSocket } from './metrics-socket'
import { startStream, stopStream, useMetricsSocket } from './useMetricsSocket'

vi.mock('./metrics-socket', () => {
  const handlers = new Map<string, (payload?: unknown) => void>()
  const reconnectHandlers = new Set<() => void>()

  return {
    metricsSocket: {
      connect: vi.fn(),
      disconnect: vi.fn(),
      emit: vi.fn(),
      on: vi.fn((event: string, cb: (payload?: unknown) => void) => {
        handlers.set(event, cb)
      }),
      off: vi.fn((event: string) => {
        handlers.delete(event)
      }),
      onReconnectAttempt: vi.fn((cb: () => void) => {
        reconnectHandlers.add(cb)
      }),
      offReconnectAttempt: vi.fn(() => {
        reconnectHandlers.clear()
      }),
      __handlers: handlers,
      __reconnectHandlers: reconnectHandlers,
    },
  }
})

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

describe('useMetricsSocket', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(metricsSocket as any).__handlers.clear()
    ;(metricsSocket as any).__reconnectHandlers.clear()
    resetStore()
  })

  it('wires listeners and updates store', () => {
    const { unmount } = renderHook(() => useMetricsSocket())

    expect((metricsSocket as any).connect).toHaveBeenCalledTimes(1)

    ;(metricsSocket as any).__handlers.get('connect')?.()
    expect(useMetricsStore.getState().connectionStatus).toBe('connected')

    ;(metricsSocket as any).__reconnectHandlers.values().next().value?.()
    expect(useMetricsStore.getState().connectionStatus).toBe('reconnecting')

    ;(metricsSocket as any).__handlers.get('stream:status')?.({ isStreaming: false })
    expect(useMetricsStore.getState().isStreaming).toBe(false)

    ;(metricsSocket as any).__handlers.get('metric:event')?.(createMetricEvent({ id: 'evt-9' }))
    expect(useMetricsStore.getState().events[0]?.id).toBe('evt-9')

    unmount()

    expect((metricsSocket as any).disconnect).toHaveBeenCalledTimes(1)
  })

  it('emits start and stop events', () => {
    startStream()
    stopStream()

    expect((metricsSocket as any).emit).toHaveBeenNthCalledWith(1, 'stream:start')
    expect((metricsSocket as any).emit).toHaveBeenNthCalledWith(2, 'stream:stop')
  })
})
