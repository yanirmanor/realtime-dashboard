import {
  Bar,
  BarChart,
  CartesianGrid,
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
      <div className="flex h-[280px] items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#141820] text-sm text-[#8b90a0]">
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
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis
          dataKey="category"
          tick={{ fontSize: 16, fill: '#a8aec0' }}
          axisLine={{ stroke: 'rgba(255,255,255,0.12)' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 14, fill: '#a8aec0' }}
          axisLine={{ stroke: 'rgba(255,255,255,0.12)' }}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip
          labelStyle={{ color: '#c1c6d7' }}
          itemStyle={{ color: '#adc7ff' }}
          contentStyle={{
            background: '#1e2024',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 12,
          }}
        />
        <Bar
          dataKey="count"
          radius={[8, 8, 0, 0]}
          fill="#4a8eff"
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
