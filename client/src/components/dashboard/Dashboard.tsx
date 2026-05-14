import { ChartsSection } from './ChartsSection'
import { EventDetailsDrawer } from './EventDetailsDrawer'
import { EventsTableSection } from './EventsTableSection'
import { MetricsGrid } from './MetricsGrid'
import { StatusBanner } from './StatusBanner'
import { StreamControls } from './StreamControls'

export function Dashboard() {
  return (
    <>
      <main className="grid gap-6">
        <StatusBanner />

        <StreamControls />

        <MetricsGrid />

        <ChartsSection />

        <EventsTableSection />
      </main>

      <EventDetailsDrawer />
    </>
  )
}
