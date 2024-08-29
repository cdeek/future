import React from 'react'
import { Product } from '@/backend/types'
import { Card } from '@/app/_components/Card'
import { Gutter } from '@/app/_components/Gutter'
import RichText from '@/app/_components/RichText'

import './style.css'

export type RelatedProductsProps = {
  blockType: 'relatedProducts'
  blockName: string
  introContent?: any
  docs?: (string | Product)[]
  relationTo: 'products'
}

export const RelatedProducts: React.FC<RelatedProductsProps> = props => {
  const { introContent, docs, relationTo } = props

  return (
    <div className="relatedProducts">
      {introContent && (
        <Gutter className="introContent">
          <RichText content={introContent} />
        </Gutter>
      )}
      <Gutter>
        <div className="grid">
          {docs?.map((doc, index) => {
            if (typeof doc === 'string') return null

            return (
              <div
                key={index}
                className={[
                  "column",
                  docs.length === 2 && 'cols-half',
                  docs.length >= 3 && 'cols-thirds',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <Card relationTo={relationTo} doc={doc} showCategories />
              </div>
            )
          })}
        </div>
      </Gutter>
    </div>
  )
}
