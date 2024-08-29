import React from 'react'

import { Page } from '@/backend/types'
import { Gutter } from '@/app/_components/Gutter'
import RichText from '@/app/_components/RichText'
import { VerticalPadding } from '@/app/_components/VerticalPadding'

import './style.css'

export const LowImpactHero: React.FC<Page['hero']> = ({ richText }) => {
  return (
    <Gutter className="lowImpactHero">
      <div className="content">
        <VerticalPadding>
          <RichText className="richText" content={richText} />
        </VerticalPadding>
      </div>
    </Gutter>
  )
}
