import { create } from 'zustand'
import type {
  ConnectionStatus,
  MetricEvent,
} from '../types/metrics.types'

type MetricsState = {
  events: MetricEvent[]
  connectionStatus: ConnectionStatus
  isStreaming: boolean
  selectedStatus: string
  searchQuery: string

  addEvent: (event: MetricEvent) => void
  clearEvents: () => void
  setConnectionStatus: (status: ConnectionStatus) => void
  setIsStreaming: (isStreaming: boolean) => void
  setSelectedStatus: (status: string) => void
  setSearchQuery: (query: string) => void
}

export const useMetricsStore = create<MetricsState>((set) => ({
  events: [],
  connectionStatus: 'disconnected',
  isStreaming: true,
  selectedStatus: 'all',
  searchQuery: '',

  addEvent: (event) =>
    set((state) => ({
      events: [event, ...state.events].slice(0, 100),
    })),

  clearEvents: () => set({ events: [] }),

  setConnectionStatus: (connectionStatus) =>
    set({ connectionStatus }),

  setIsStreaming: (isStreaming) =>
    set({ isStreaming }),

  setSelectedStatus: (selectedStatus) =>
    set({ selectedStatus }),

  setSearchQuery: (searchQuery) =>
    set({ searchQuery }),
}))
