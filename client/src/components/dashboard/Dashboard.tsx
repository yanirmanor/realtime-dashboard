import { ChartsSection } from './ChartsSection'
import { EventDetailsDrawer } from './EventDetailsDrawer'
import { EventsTableSection } from './EventsTableSection'
import { MetricsGrid } from './MetricsGrid'
import { StatusBanner } from './StatusBanner'

export function Dashboard() {
  return (
    <>
      <main className="grid gap-6">
        <StatusBanner />

        <MetricsGrid />

        <ChartsSection />

        <EventsTableSection />
      </main>

      <EventDetailsDrawer />
    </>
  )
}
