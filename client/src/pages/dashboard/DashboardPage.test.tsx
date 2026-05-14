import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { DashboardPage } from './DashboardPage'

const useMetricsSocket = vi.fn()

vi.mock('@/features/metrics/sockets/useMetricsSocket', () => ({
  useMetricsSocket: () => useMetricsSocket(),
}))

vi.mock('@/shared/layout/Header', () => ({
  Header: () => <div>Header Component</div>,
}))

vi.mock('@/features/metrics/components/Dashboard', () => ({
  Dashboard: () => <div>Dashboard Component</div>,
}))

describe('DashboardPage', () => {
  it('initializes socket hook and renders layout sections', () => {
    render(<DashboardPage />)

    expect(useMetricsSocket).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Header Component')).toBeInTheDocument()
    expect(screen.getByText('Dashboard Component')).toBeInTheDocument()
  })
})
