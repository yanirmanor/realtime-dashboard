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
    <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-sm font-medium text-slate-200">
            Stream controls
          </h2>
          <p className="text-sm text-slate-400">
            Control and filter live claim event ingestion.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={startStream}
            disabled={isStreaming}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-emerald-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Play size={16} />
            Start
          </button>

          <button
            type="button"
            onClick={stopStream}
            disabled={!isStreaming}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-amber-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Pause size={16} />
            Stop
          </button>

          <button
            type="button"
            onClick={clearEvents}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            <Trash2 size={16} />
            Clear
          </button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_220px]">
        <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-3 py-2">
          <Search size={16} className="text-slate-500" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search claim, agent, event..."
            className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
          />
        </label>

        <select
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
          className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-slate-200 outline-none"
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
