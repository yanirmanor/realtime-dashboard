import { useMetricsStore } from '../../features/metrics/store/metrics.store'
import { EventsTable } from './EventsTable'

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

      <EventsTable />
    </section>
  )
}
