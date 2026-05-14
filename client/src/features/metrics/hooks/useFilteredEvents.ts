import { useEffect, useMemo, useState } from 'react'
import { useMetricsStore } from '../store/metrics.store'

const SEARCH_DEBOUNCE_MS = 200

export function useFilteredEvents() {
  const events = useMetricsStore((state) => state.events)
  const selectedStatus = useMetricsStore((state) => state.selectedStatus)
  const searchQuery = useMetricsStore((state) => state.searchQuery)
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [searchQuery])

  return useMemo(() => {
    const query = debouncedSearchQuery.trim().toLowerCase()

    return events.filter((event) => {
      const matchesStatus =
        selectedStatus === 'all' || event.status === selectedStatus

      const matchesSearch =
        !query ||
        event.claimId.toLowerCase().includes(query) ||
        event.agentName.toLowerCase().includes(query) ||
        event.eventType.toLowerCase().includes(query) ||
        event.status.toLowerCase().includes(query)

      return matchesStatus && matchesSearch
    })
  }, [debouncedSearchQuery, events, selectedStatus])
}
