import { useMetricsSocket } from '../../features/metrics/sockets/useMetricsSocket'
import {
  startStream,
  stopStream,
} from '../../features/metrics/sockets/useMetricsSocket'
import { useMetricsStore } from '../../features/metrics/store/metrics.store'

export function DashboardPage() {
  useMetricsSocket()

  const events = useMetricsStore((state) => state.events)
  const connectionStatus = useMetricsStore(
    (state) => state.connectionStatus,
  )
  const isStreaming = useMetricsStore((state) => state.isStreaming)
  const clearEvents = useMetricsStore((state) => state.clearEvents)

  return (
    <main>
      <h1>Live Claims Operations</h1>

      <p>Status: {connectionStatus}</p>
      <p>Streaming: {isStreaming ? 'Yes' : 'No'}</p>

      <button type="button" onClick={startStream}>Start</button>
      <button type="button" onClick={stopStream}>Stop</button>
      <button type="button" onClick={clearEvents}>Clear</button>

      <pre>{JSON.stringify(events[0], null, 2)}</pre>
    </main>
  )
}
