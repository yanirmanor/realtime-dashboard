import { Pause, Play, Search, Trash2 } from 'lucide-react'
import {
  startStream,
  stopStream,
} from '../../features/metrics/sockets/useMetricsSocket'
import { useMetricsStore } from '../../features/metrics/store/metrics.store'

const statuses = [
  'all',
  'processing',
  'approved',
  'rejected',
  'fraud_review',
  'failed',
]

export function StreamControls() {
  const isStreaming = useMetricsStore((state) => state.isStreaming)
  const clearEvents = useMetricsStore((state) => state.clearEvents)

  const selectedStatus = useMetricsStore((state) => state.selectedStatus)
  const setSelectedStatus = useMetricsStore(
    (state) => state.setSelectedStatus,
  )

  const searchQuery = useMetricsStore((state) => state.searchQuery)
  const setSearchQuery = useMetricsStore((state) => state.setSearchQuery)

  return (
    <section className="grid gap-3">
      <div className="flex flex-wrap gap-2 lg:justify-end">
        <button
          type="button"
          aria-label="Start live event stream"
          onClick={startStream}
          disabled={isStreaming}
          className="inline-flex items-center gap-2 rounded-lg bg-[#4edea3] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#003824] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Play size={16} />
          Start
        </button>

        <button
          type="button"
          aria-label="Pause live event stream"
          onClick={stopStream}
          disabled={!isStreaming}
          className="inline-flex items-center gap-2 rounded-lg bg-[#ffb84d] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#5c3900] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Pause size={16} />
          Stop
        </button>

        <button
          type="button"
          aria-label="Clear all live events"
          onClick={clearEvents}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#1a1c20] px-4 py-2 text-sm font-medium text-[#e2e2e8] hover:bg-[#282a2e]"
        >
          <Trash2 size={16} />
          Clear
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_240px]">
        <label className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0c0e12] px-4 py-2.5">
          <Search size={16} className="text-[#8b90a0]" />
          <input
            aria-label="Search live claim events"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search claim, agent, event..."
            className="w-full bg-transparent text-sm text-[#e2e2e8] outline-none placeholder:text-[#8b90a0]"
          />
        </label>

        <select
          aria-label="Filter events by claim status"
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
          className="rounded-xl border border-white/10 bg-[#141820] px-3 py-2 text-sm text-[#e2e2e8] outline-none"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}
