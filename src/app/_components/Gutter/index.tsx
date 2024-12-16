import React, { forwardRef, Ref } from 'react'

import './style.css';

type Props = {
  className?: string
  children: React.ReactNode
  ref?: Ref<HTMLDivElement>
}

export const Gutter = (props: Props) => {
  const { className, children } = props

  return (
    <div className={`gutter ${className}`}>
      {children}
    </div>
  )
}

//Gutter.displayName = 'Gutter'
