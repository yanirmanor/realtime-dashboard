import { animate, motion, useMotionValue, useMotionValueEvent } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'

type MetricCardProps = {
  title: string
  value: string | number
  suffix?: string
  animationDuration?: number
  description: string
  icon: LucideIcon
}

type AnimatedValueProps = {
  value: number
  suffix?: string
  duration: number
}

function AnimatedValue({ value, suffix, duration }: AnimatedValueProps) {
  const motionValue = useMotionValue(value)
  const [displayValue, setDisplayValue] = useState(value)

  useMotionValueEvent(motionValue, 'change', (latest) => {
    setDisplayValue(Math.round(latest))
  })

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      ease: 'easeOut',
    })

    return () => controls.stop()
  }, [duration, motionValue, value])

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  )
}

export function MetricCard({
  title,
  value,
  suffix,
  animationDuration = 0.45,
  description,
  icon: Icon,
}: MetricCardProps) {
  const isNumeric = typeof value === 'number'

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-100">
            {isNumeric
              ? <AnimatedValue value={value} suffix={suffix} duration={animationDuration} />
              : value}
          </p>
        </div>
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="rounded-xl border border-white/10 bg-slate-900/80 p-2 text-cyan-300"
        >
          <Icon size={18} />
        </motion.div>
      </div>
      <p className="mt-3 text-sm text-slate-500">{description}</p>
    </motion.article>
  )
}
