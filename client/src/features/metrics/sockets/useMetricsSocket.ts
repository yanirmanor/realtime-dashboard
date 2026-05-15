import { useEffect } from 'react'
import { metricsSocket } from './metrics-socket'
import type { MetricEvent } from '@/features/metrics/types/metrics.types'
import { useMetricsStore } from '@/features/metrics/store/metrics.store'

export function useMetricsSocket() {
  const addEvent = useMetricsStore((state) => state.addEvent)
  const setConnectionStatus = useMetricsStore(
    (state) => state.setConnectionStatus,
  )
  const setIsStreaming = useMetricsStore(
    (state) => state.setIsStreaming,
  )

  useEffect(() => {
    metricsSocket.connect()

    metricsSocket.on('connect', () => {
      setConnectionStatus('connected')
    })

    metricsSocket.on('disconnect', () => {
      setConnectionStatus('disconnected')
    })

    metricsSocket.onReconnectAttempt(() => {
      setConnectionStatus('reconnecting')
    })

    metricsSocket.on('metric:event', (event: MetricEvent) => {
      addEvent(event)
    })

    metricsSocket.on('stream:status', ({ isStreaming }) => {
      setIsStreaming(isStreaming)
    })

    return () => {
      metricsSocket.off('connect')
      metricsSocket.off('disconnect')
      metricsSocket.off('metric:event')
      metricsSocket.off('stream:status')
      metricsSocket.offReconnectAttempt()
      metricsSocket.disconnect()
    }
  }, [addEvent, setConnectionStatus, setIsStreaming])
}

export function startStream() {
  metricsSocket.emit('stream:start')
}

export function stopStream() {
  metricsSocket.emit('stream:stop')
}
