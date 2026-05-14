import { useEffect } from 'react'
import { socket } from './socket-client'
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
    socket.connect()

    socket.on('connect', () => {
      setConnectionStatus('connected')
    })

    socket.on('disconnect', () => {
      setConnectionStatus('disconnected')
    })

    socket.io.on('reconnect_attempt', () => {
      setConnectionStatus('reconnecting')
    })

    socket.on('metric:event', (event: MetricEvent) => {
      addEvent(event)
    })

    socket.on('stream:status', ({ isStreaming }) => {
      setIsStreaming(isStreaming)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('metric:event')
      socket.off('stream:status')
      socket.io.off('reconnect_attempt')
      socket.disconnect()
    }
  }, [addEvent, setConnectionStatus, setIsStreaming])
}

export function startStream() {
  socket.emit('stream:start')
}

export function stopStream() {
  socket.emit('stream:stop')
}
