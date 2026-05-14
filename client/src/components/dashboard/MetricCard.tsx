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
      className="widget-card rounded-xl border-t-2 border-t-[#adc7ff]/50 p-5 shadow-[0_0_18px_-6px_rgba(173,199,255,0.2)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#c1c6d7]">
            {title}
          </p>
          <p className="mt-2 text-4xl font-semibold text-[#e2e2e8]">
            {isNumeric
              ? <AnimatedValue value={value} suffix={suffix} duration={animationDuration} />
              : value}
          </p>
        </div>
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="rounded-xl border border-white/10 bg-[#1e2024] p-2 text-[#adc7ff]"
        >
          <Icon size={18} />
        </motion.div>
      </div>
      <p className="mt-3 text-sm text-[#8b90a0]">{description}</p>
    </motion.article>
  )
}
