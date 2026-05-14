import { useMetricsStore } from '../../features/metrics/store/metrics.store'

export function MetricsGrid() {
  const events = useMetricsStore((state) => state.events)

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-sm text-slate-400">Claims Processed</p>
        <p className="mt-2 text-3xl font-semibold">{events.length}</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-sm text-slate-400">Fraud Alerts</p>
        <p className="mt-2 text-3xl font-semibold">
          {events.filter((event) => event.eventType === 'fraud_alert').length}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-sm text-slate-400">Avg Processing Time</p>
        <p className="mt-2 text-3xl font-semibold">
          {events.length
            ? Math.round(
                events.reduce((sum, event) => sum + event.durationMs, 0) /
                  events.length,
              )
            : 0}
          ms
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-sm text-slate-400">Active AI Agents</p>
        <p className="mt-2 text-3xl font-semibold">
          {new Set(events.map((event) => event.agentName)).size}
        </p>
      </div>
    </section>
  )
}
