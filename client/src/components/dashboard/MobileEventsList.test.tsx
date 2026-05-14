import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MobileEventsList } from './MobileEventsList'

vi.mock('../../features/metrics/hooks/useFilteredEvents', () => ({
  useFilteredEvents: vi.fn(() => []),
}))

describe('MobileEventsList', () => {
  it('renders empty state when there are no events', () => {
    render(<MobileEventsList />)

    expect(screen.getByText('No events to display')).toBeInTheDocument()
    expect(
      screen.getByText(/Waiting for live claim events/i),
    ).toBeInTheDocument()
  })
})
