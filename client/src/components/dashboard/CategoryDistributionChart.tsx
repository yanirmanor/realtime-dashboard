import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useMetricsStore } from '../../features/metrics/store/metrics.store'

const categories = ['health', 'car', 'home', 'travel']

export function CategoryDistributionChart() {
  const events = useMetricsStore((state) => state.events)

  if (events.length === 0) {
    return (
      <div className="flex h-[280px] items-center justify-center rounded-xl border border-dashed border-white/10 text-sm text-slate-500">
        Waiting for category distribution data...
      </div>
    )
  }

  const chartData = categories.map((category) => ({
    category,
    count: events.filter((event) => event.category === category).length,
  }))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData}>
        <XAxis dataKey="category" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
        <Tooltip
          contentStyle={{
            background: '#020617',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12,
          }}
        />
        <Bar dataKey="count" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
