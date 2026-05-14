import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createMetricEvent } from '@/test/fixtures'
import { useMetricsStore } from '@/features/metrics/store/metrics.store'
import { socket } from './socket-client'
import { startStream, stopStream, useMetricsSocket } from './useMetricsSocket'

vi.mock('./socket-client', () => {
  const handlers = new Map<string, (payload?: unknown) => void>()
  const ioHandlers = new Map<string, (payload?: unknown) => void>()

  return {
    socket: {
      connect: vi.fn(),
      disconnect: vi.fn(),
      emit: vi.fn(),
      on: vi.fn((event: string, cb: (payload?: unknown) => void) => {
        handlers.set(event, cb)
      }),
      off: vi.fn((event: string) => {
        handlers.delete(event)
      }),
      io: {
        on: vi.fn((event: string, cb: (payload?: unknown) => void) => {
          ioHandlers.set(event, cb)
        }),
        off: vi.fn((event: string) => {
          ioHandlers.delete(event)
        }),
      },
      __handlers: handlers,
      __ioHandlers: ioHandlers,
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
    ;(socket as any).__handlers.clear()
    ;(socket as any).__ioHandlers.clear()
    resetStore()
  })

  it('wires listeners and updates store', () => {
    const { unmount } = renderHook(() => useMetricsSocket())

    expect((socket as any).connect).toHaveBeenCalledTimes(1)

    ;(socket as any).__handlers.get('connect')?.()
    expect(useMetricsStore.getState().connectionStatus).toBe('connected')

    ;(socket as any).__ioHandlers.get('reconnect_attempt')?.()
    expect(useMetricsStore.getState().connectionStatus).toBe('reconnecting')

    ;(socket as any).__handlers.get('stream:status')?.({ isStreaming: false })
    expect(useMetricsStore.getState().isStreaming).toBe(false)

    ;(socket as any).__handlers.get('metric:event')?.(createMetricEvent({ id: 'evt-9' }))
    expect(useMetricsStore.getState().events[0]?.id).toBe('evt-9')

    unmount()

    expect((socket as any).disconnect).toHaveBeenCalledTimes(1)
  })

  it('emits start and stop events', () => {
    startStream()
    stopStream()

    expect((socket as any).emit).toHaveBeenNthCalledWith(1, 'stream:start')
    expect((socket as any).emit).toHaveBeenNthCalledWith(2, 'stream:stop')
  })
})
