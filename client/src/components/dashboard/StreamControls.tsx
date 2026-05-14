import { Pause, Play, Trash2 } from 'lucide-react'
import {
  startStream,
  stopStream,
} from '../../features/metrics/sockets/useMetricsSocket'
import { useMetricsStore } from '../../features/metrics/store/metrics.store'

export function StreamControls() {
  const isStreaming = useMetricsStore((state) => state.isStreaming)
  const clearEvents = useMetricsStore((state) => state.clearEvents)

  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-sm font-medium text-slate-200">
          Stream controls
        </h2>
        <p className="text-sm text-slate-400">
          Control live claim event ingestion.
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
    </section>
  )
}
