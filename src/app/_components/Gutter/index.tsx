import React, { forwardRef, Ref } from 'react'

import './style.css';

type Props = {
  left?: boolean
  right?: boolean
  className?: string
  children: React.ReactNode
  ref?: Ref<HTMLDivElement>
}

export const Gutter = (props: Props) => {
  const { left = true, right = true, className, children } = props

  return (
    <div className={`gutter ${left && 'gutterLeft'} ${right && 'gutterRight'} ${className}`}>
      {children}
    </div>
  )
}

//Gutter.displayName = 'Gutter'
