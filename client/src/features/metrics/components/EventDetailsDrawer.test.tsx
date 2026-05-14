import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createMetricEvent } from '@/test/fixtures'
import { useMetricsStore } from '@/features/metrics/store/metrics.store'
import { EventDetailsDrawer } from './EventDetailsDrawer'

vi.mock('@base-ui-components/react/dialog', () => {
  const Root = ({ children, onOpenChange }: any) => (
    <div data-testid="dialog-root" onClick={() => onOpenChange?.(false)}>{children}</div>
  )
  const Portal = ({ children }: any) => <div>{children}</div>
  const Backdrop = ({ className }: any) => <div className={className} />
  const Popup = ({ children, ...props }: any) => <div {...props}>{children}</div>
  const Title = ({ children, className }: any) => <h2 className={className}>{children}</h2>
  const Description = ({ children, className }: any) => <p className={className}>{children}</p>
  const Close = ({ children, ...props }: any) => <button type="button" {...props}>{children}</button>

  return { Dialog: { Root, Portal, Backdrop, Popup, Title, Description, Close } }
})

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

describe('EventDetailsDrawer', () => {
  beforeEach(() => {
    resetStore()
  })

  it('returns null when no event is selected', () => {
    const { container } = render(<EventDetailsDrawer />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders selected event details and closes on dialog close event', () => {
    useMetricsStore.setState({
      selectedEvent: createMetricEvent({ claimId: 'CLM-7777', confidenceScore: 0.91 }),
    })

    render(<EventDetailsDrawer />)

    expect(screen.getByText('CLM-7777')).toBeInTheDocument()
    expect(screen.getByText('91%')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('dialog-root'))
    expect(useMetricsStore.getState().selectedEvent).toBeNull()
  })
})
