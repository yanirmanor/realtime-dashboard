import { useFilteredEvents } from '@/features/metrics/hooks/useFilteredEvents'
import { EventsTable } from './EventsTable'
import { MobileEventsList } from './MobileEventsList'

export function EventsTableSection() {
  const events = useFilteredEvents()

  return (
    <section className="widget-card overflow-hidden rounded-xl p-5">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-medium text-[#e2e2e8]">Live Events</h2>
          <p className="text-sm text-[#c1c6d7]">
            Latest incoming workflow events.
          </p>
        </div>

        <span className="rounded-full border border-white/10 bg-[#282a2e] px-3 py-1 text-sm text-[#c1c6d7]">
          {events.length} visible events
        </span>
      </div>

      <div className="hidden md:block">
        <EventsTable />
      </div>

      <div className="md:hidden">
        <MobileEventsList />
      </div>
    </section>
  )
}
