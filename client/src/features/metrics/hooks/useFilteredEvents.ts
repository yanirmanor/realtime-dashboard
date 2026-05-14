import { useMemo } from 'react'
import { useMetricsStore } from '../store/metrics.store'

export function useFilteredEvents() {
  const events = useMetricsStore((state) => state.events)
  const selectedStatus = useMetricsStore((state) => state.selectedStatus)
  const searchQuery = useMetricsStore((state) => state.searchQuery)

  return useMemo(() => {
    return events.filter((event) => {
      const matchesStatus =
        selectedStatus === 'all' || event.status === selectedStatus

      const query = searchQuery.trim().toLowerCase()

      const matchesSearch =
        !query ||
        event.claimId.toLowerCase().includes(query) ||
        event.agentName.toLowerCase().includes(query) ||
        event.eventType.toLowerCase().includes(query) ||
        event.status.toLowerCase().includes(query)

      return matchesStatus && matchesSearch
    })
  }, [events, selectedStatus, searchQuery])
}
