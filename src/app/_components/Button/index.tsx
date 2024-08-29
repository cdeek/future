import React, { ElementType } from 'react'
import Link from 'next/link'

import './style.css';

export type Props = {
  label?: string
  appearance?: 'default' | 'secondary' | 'link' | 'outline' | 'ghost' | 'destructive'| 'none'
  el?: 'button' | 'link' | 'a'
  onClick?: () => void
  href?: string
  newTab?: boolean
  className?: string
  type?: 'submit' | 'button'
  disabled?: boolean
  children?: React.ReactNode
}

export const Button: React.FC<Props> = ({
  el: elFromProps = 'link',
  label,
  newTab,
  href,
  appearance,
  className: classNameFromProps,
  onClick,
  type = 'button',
  disabled,
  children,
}) => {
  let el = elFromProps

  const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  const className = [
    "button",
    classNameFromProps,
    `appearance-${appearance}`
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <div className="content">
      <span className="label">{label}</span>
      {children}
    </div>
  )

  if (onClick || type === 'submit') el = 'button'

  if (el === 'link') {
    return (
      <Link href={href || ''} className={className} {...newTabProps} onClick={onClick}>
        {content}
      </Link>
    )
  }

  const Element: ElementType = el

  return (
    <Element
      href={href}
      className={className}
      type={type}
      {...newTabProps}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </Element>
  )
}
