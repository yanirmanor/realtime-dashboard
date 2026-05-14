import { useEffect, useState } from 'react'
import { socket } from './socket-client'
import type {
  ConnectionStatus,
  MetricEvent,
} from '../types/metrics.types'

type UseMetricsSocketOptions = {
  onEvent: (event: MetricEvent) => void
}

export function useMetricsSocket({ onEvent }: UseMetricsSocketOptions) {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>('disconnected')

  const [isStreaming, setIsStreaming] = useState(true)

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
      onEvent(event)
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
  }, [onEvent])

  const startStream = () => {
    socket.emit('stream:start')
  }

  const stopStream = () => {
    socket.emit('stream:stop')
  }

  return {
    connectionStatus,
    isStreaming,
    startStream,
    stopStream,
  }
}
