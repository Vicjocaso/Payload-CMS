import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <span
      className={clsx(
        'font-serif text-[1.35rem] leading-none tracking-[0.04em] text-current',
        className,
      )}
    >
      Atelier Wellness
    </span>
  )
}
