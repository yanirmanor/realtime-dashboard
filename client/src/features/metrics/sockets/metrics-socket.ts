import { io } from 'socket.io-client'
import type { MetricEvent } from '@/features/metrics/types/metrics.types'

type SocketEventMap = {
  connect: undefined
  disconnect: undefined
  'metric:event': MetricEvent
  'stream:status': { isStreaming: boolean }
}

type SocketEventName = keyof SocketEventMap
type Listener<TEvent extends SocketEventName> = (
  payload: SocketEventMap[TEvent],
) => void

export type MetricsSocket = {
  connect: () => void
  disconnect: () => void
  on: <TEvent extends SocketEventName>(
    event: TEvent,
    listener: Listener<TEvent>,
  ) => void
  off: (event: SocketEventName) => void
  onReconnectAttempt: (listener: () => void) => void
  offReconnectAttempt: () => void
  emit: (event: 'stream:start' | 'stream:stop') => void
}

const statuses = ['processing', 'approved', 'rejected', 'fraud_review', 'failed'] as const
const categories = ['health', 'car', 'home', 'travel'] as const
const agents = ['Policy Extractor', 'Fraud Detector', 'Claim Validator', 'Risk Scorer'] as const
const eventTypes = ['claim_created', 'document_processed', 'ai_decision', 'fraud_alert'] as const

function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function createMockEvent(): MetricEvent {
  const status = randomItem(statuses)

  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    claimId: `CLM-${randomNumber(10000, 99999)}`,
    eventType: status === 'failed' ? 'workflow_failed' : randomItem(eventTypes),
    agentName: randomItem(agents),
    status,
    category: randomItem(categories),
    durationMs: randomNumber(300, 6500),
    confidenceScore: Number((Math.random() * (0.99 - 0.65) + 0.65).toFixed(2)),
  }
}

function createRealMetricsSocket(): MetricsSocket {
  const socket = io('http://localhost:4000', {
    autoConnect: false,
    transports: ['websocket'],
  })

  return {
    connect: () => {
      socket.connect()
    },
    disconnect: () => {
      socket.disconnect()
    },
    on: (event, listener) => {
      ;(socket as any).on(event, listener)
    },
    off: (event) => {
      socket.off(event)
    },
    onReconnectAttempt: (listener) => {
      socket.io.on('reconnect_attempt', listener)
    },
    offReconnectAttempt: () => {
      socket.io.off('reconnect_attempt')
    },
    emit: (event) => {
      socket.emit(event)
    },
  }
}

function createMockMetricsSocket(): MetricsSocket {
  const handlers = new Map<SocketEventName, Set<Listener<SocketEventName>>>()
  const reconnectHandlers = new Set<() => void>()
  let isStreaming = true
  let intervalId: ReturnType<typeof setInterval> | null = null

  const emitEvent = <TEvent extends SocketEventName>(
    event: TEvent,
    payload: SocketEventMap[TEvent],
  ) => {
    const listeners = handlers.get(event)

    if (!listeners) return

    listeners.forEach((listener) => {
      listener(payload as SocketEventMap[SocketEventName])
    })
  }

  return {
    connect: () => {
      emitEvent('connect', undefined)

      if (intervalId) {
        clearInterval(intervalId)
      }

      intervalId = setInterval(() => {
        if (!isStreaming) return
        emitEvent('metric:event', createMockEvent())
      }, 1000)

      emitEvent('stream:status', { isStreaming })
    },
    disconnect: () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
      intervalId = null
      emitEvent('disconnect', undefined)
    },
    on: (event, listener) => {
      const listeners = handlers.get(event) ?? new Set<Listener<SocketEventName>>()
      listeners.add(listener as Listener<SocketEventName>)
      handlers.set(event, listeners)
    },
    off: (event) => {
      handlers.delete(event)
    },
    onReconnectAttempt: (listener) => {
      reconnectHandlers.add(listener)
    },
    offReconnectAttempt: () => {
      reconnectHandlers.clear()
    },
    emit: (event) => {
      if (event === 'stream:start') {
        isStreaming = true
      }

      if (event === 'stream:stop') {
        isStreaming = false
      }

      emitEvent('stream:status', { isStreaming })
    },
  }
}

export const SOCKET_MODE = import.meta.env.VITE_SOCKET_MODE === 'mock' ? 'mock' : 'real'

export const metricsSocket =
  SOCKET_MODE === 'mock'
    ? createMockMetricsSocket()
    : createRealMetricsSocket()
