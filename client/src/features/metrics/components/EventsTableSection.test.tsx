import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { createMetricEvent } from '@/test/fixtures'
import { EventsTableSection } from './EventsTableSection'

vi.mock('@/features/metrics/hooks/useFilteredEvents', () => ({
  useFilteredEvents: vi.fn(() => [createMetricEvent(), createMetricEvent({ id: 'evt-2' })]),
}))

vi.mock('./EventsTable', () => ({
  EventsTable: () => <div>Desktop Table</div>,
}))

vi.mock('./MobileEventsList', () => ({
  MobileEventsList: () => <div>Mobile List</div>,
}))

describe('EventsTableSection', () => {
  it('renders event count and table wrappers', () => {
    render(<EventsTableSection />)

    expect(screen.getByText('Live Events')).toBeInTheDocument()
    expect(screen.getByText('2 visible events')).toBeInTheDocument()
    expect(screen.getByText('Desktop Table')).toBeInTheDocument()
    expect(screen.getByText('Mobile List')).toBeInTheDocument()
  })
})
