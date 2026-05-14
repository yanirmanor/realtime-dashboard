import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useMetricsStore } from '../../features/metrics/store/metrics.store'
import { StatusBanner } from './StatusBanner'

function resetStore() {
  useMetricsStore.setState({
    events: [],
    selectedEvent: null,
    connectionStatus: 'disconnected',
    isStreaming: true,
    selectedStatus: 'all',
    searchQuery: '',
  })
}

describe('StatusBanner', () => {
  beforeEach(() => {
    resetStore()
  })

  it('shows reconnecting state', () => {
    useMetricsStore.setState({ connectionStatus: 'reconnecting' })
    render(<StatusBanner />)

    expect(screen.getByText('Reconnecting to live stream')).toBeInTheDocument()
  })

  it('shows disconnected state', () => {
    useMetricsStore.setState({ connectionStatus: 'disconnected' })
    render(<StatusBanner />)

    expect(screen.getByText('Live stream disconnected')).toBeInTheDocument()
  })

  it('shows paused state when connected but stopped', () => {
    useMetricsStore.setState({ connectionStatus: 'connected', isStreaming: false })
    render(<StatusBanner />)

    expect(screen.getByText('Stream paused')).toBeInTheDocument()
  })

  it('renders nothing when connected and streaming', () => {
    useMetricsStore.setState({ connectionStatus: 'connected', isStreaming: true })
    const { container } = render(<StatusBanner />)
    expect(container).toBeEmptyDOMElement()
  })
})
