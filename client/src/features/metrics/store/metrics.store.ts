import { create } from 'zustand'
import type {
  ConnectionStatus,
  MetricEvent,
} from '@/features/metrics/types/metrics.types'

type MetricsState = {
  events: MetricEvent[]
  selectedEvent: MetricEvent | null
  connectionStatus: ConnectionStatus
  isStreaming: boolean
  selectedStatus: string
  searchQuery: string

  addEvent: (event: MetricEvent) => void
  clearEvents: () => void
  selectEvent: (event: MetricEvent) => void
  closeEventDetails: () => void
  setConnectionStatus: (status: ConnectionStatus) => void
  setIsStreaming: (isStreaming: boolean) => void
  setSelectedStatus: (status: string) => void
  setSearchQuery: (query: string) => void
}

export const useMetricsStore = create<MetricsState>((set) => ({
  events: [],
  selectedEvent: null,
  connectionStatus: 'disconnected',
  isStreaming: true,
  selectedStatus: 'all',
  searchQuery: '',

  addEvent: (event) =>
    set((state) => ({
      events: [event, ...state.events].slice(0, 100),
    })),

  clearEvents: () => set({ events: [] }),

  selectEvent: (event) => set({ selectedEvent: event }),

  closeEventDetails: () => set({ selectedEvent: null }),

  setConnectionStatus: (connectionStatus) =>
    set({ connectionStatus }),

  setIsStreaming: (isStreaming) =>
    set({ isStreaming }),

  setSelectedStatus: (selectedStatus) =>
    set({ selectedStatus }),

  setSearchQuery: (searchQuery) =>
    set({ searchQuery }),
}))
