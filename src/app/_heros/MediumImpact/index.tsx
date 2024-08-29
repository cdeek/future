import React from 'react'

import { Page } from '@/backend/types'
import { Gutter } from '@/app/_components/Gutter'
import { CMSLink } from '@/app/_components/Link'
import { Media } from '@/app/_components/Media'
import RichText from '@/app/_components/RichText'

import './style.css'

export const MediumImpactHero: React.FC<Page['hero']> = props => {
  const { richText, media, links } = props

  return (
    <Gutter className="hero">
      <div className="background">
        <RichText className="richText" content={richText} />
        {Array.isArray(links) && (
          <ul className="links">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink className="link" {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className="media">
        {typeof media === 'object' && <Media className="media" resource={media} />}
      </div>
    </Gutter>
  )
}
