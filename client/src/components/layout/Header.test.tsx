import { act, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useMetricsStore } from '../../features/metrics/store/metrics.store'
import { Header } from './Header'

const startStream = vi.fn()
const stopStream = vi.fn()

vi.mock('../../features/metrics/sockets/useMetricsSocket', () => ({
  startStream: () => startStream(),
  stopStream: () => stopStream(),
}))

vi.mock('@base-ui-components/react/select', () => {
  const Root = ({ children }: any) => <div>{children}</div>
  const Trigger = ({ children, ...props }: any) => <button type="button" {...props}>{children}</button>
  const Value = ({ children }: any) => <>{typeof children === 'function' ? children('all') : children}</>
  const Portal = ({ children }: any) => <div>{children}</div>
  const Positioner = ({ children }: any) => <div>{children}</div>
  const Popup = ({ children }: any) => <div>{children}</div>
  const List = ({ children }: any) => <div>{children}</div>
  const Item = ({ children }: any) => <div>{children}</div>
  const ItemText = ({ children }: any) => <span>{children}</span>
  const ItemIndicator = ({ children }: any) => <span>{children}</span>

  return {
    Select: {
      Root,
      Trigger,
      Value,
      Portal,
      Positioner,
      Popup,
      List,
      Item,
      ItemText,
      ItemIndicator,
    },
  }
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

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    resetStore()
  })

  it('updates and clears search query', () => {
    render(<Header />)

    const input = screen.getByLabelText('Search live claim events')
    fireEvent.change(input, { target: { value: 'agent smith' } })

    expect(useMetricsStore.getState().searchQuery).toBe('agent smith')

    const clearButton = screen.getByLabelText('Clear search query')
    fireEvent.click(clearButton)

    expect(useMetricsStore.getState().searchQuery).toBe('')
  })

  it('calls stream controls based on streaming state', () => {
    render(<Header />)
    screen
      .getAllByLabelText('Pause live event stream')
      .forEach((button) => fireEvent.click(button))
    expect(stopStream).toHaveBeenCalled()

    act(() => {
      useMetricsStore.setState({ isStreaming: false })
    })
    screen
      .getAllByLabelText('Start live event stream')
      .forEach((button) => fireEvent.click(button))
    expect(startStream).toHaveBeenCalled()
  })
})
