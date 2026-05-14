import { ChartsSection } from './ChartsSection'
import { EventsTableSection } from './EventsTableSection'
import { MetricsGrid } from './MetricsGrid'
import { StreamControls } from './StreamControls'

export function Dashboard() {
  return (
    <main className="grid gap-6">
      <StreamControls />

      <MetricsGrid />

      <ChartsSection />

      <EventsTableSection />
    </main>
  )
}
