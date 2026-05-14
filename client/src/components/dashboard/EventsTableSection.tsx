import { useMetricsStore } from '../../features/metrics/store/metrics.store'

export function EventsTableSection() {
  const events = useMetricsStore((state) => state.events)

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-medium text-slate-100">Live Events</h2>
          <p className="text-sm text-slate-400">
            Latest incoming workflow events.
          </p>
        </div>

        <span className="rounded-full border border-white/10 bg-slate-900 px-3 py-1 text-sm text-slate-400">
          {events.length} events
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="grid grid-cols-5 bg-slate-900 px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
          <span>Claim</span>
          <span>Type</span>
          <span>Status</span>
          <span>Agent</span>
          <span>Confidence</span>
        </div>

        <div className="divide-y divide-white/10">
          {events.slice(0, 5).map((event) => (
            <div
              key={event.id}
              className="grid grid-cols-5 px-4 py-3 text-sm text-slate-300"
            >
              <span>{event.claimId}</span>
              <span>{event.eventType}</span>
              <span>{event.status}</span>
              <span>{event.agentName}</span>
              <span>{Math.round(event.confidenceScore * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
