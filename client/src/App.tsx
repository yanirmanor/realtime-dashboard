import { useCallback, useState } from 'react'
import { useMetricsSocket } from './features/metrics/sockets/useMetricsSocket'
import type { MetricEvent } from './features/metrics/types/metrics.types'
import './App.css'

function App() {
  const [events, setEvents] = useState<MetricEvent[]>([])

  const handleEvent = useCallback((event: MetricEvent) => {
    setEvents((prev) => [event, ...prev].slice(0, 50))
  }, [])

  const { connectionStatus, isStreaming, startStream, stopStream } = useMetricsSocket({
    onEvent: handleEvent,
  })

  return (
    <main>
      <h1>Realtime Metrics</h1>
      <p>Connection: {connectionStatus}</p>
      <p>Streaming: {isStreaming ? 'on' : 'off'}</p>
      <p>Events received: {events.length}</p>
      <button type="button" onClick={startStream}>Start stream</button>
      <button type="button" onClick={stopStream}>Stop stream</button>
    </main>
  )
}

export default App
