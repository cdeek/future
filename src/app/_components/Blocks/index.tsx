import React, { Fragment } from 'react'

import { Page } from '@/backend/types'
import { ArchiveBlock } from '@/app/_blocks/ArchiveBlock'
import { CallToActionBlock } from '@/app/_blocks/CallToAction'
import { ContentBlock } from '@/app/_blocks/Content'
import { MediaBlock } from '@/app/_blocks/MediaBlock'
import { RelatedProducts, type RelatedProductsProps } from '@/app/_blocks/RelatedProducts'
import { VerticalPadding, VerticalPaddingOptions } from '../VerticalPadding/index'

const blockComponents = {
  cta: CallToActionBlock,
  content: ContentBlock,
  mediaBlock: MediaBlock,
  archive: ArchiveBlock,
  relatedProducts: RelatedProducts,
}

export const Blocks: React.FC<{
  blocks: (Page['layout'][0] | RelatedProductsProps)[]
  disableTopPadding?: boolean
}> = props => {
  const { disableTopPadding, blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            let paddingTop: VerticalPaddingOptions = 'large'
            let paddingBottom: VerticalPaddingOptions = 'large'

            if (index === blocks.length - 1) {
              paddingBottom = 'large'
            }

            if (disableTopPadding && index === 0) {
              paddingTop = 'none'
            }

            if (Block) {
              return (
                <VerticalPadding top={paddingTop} bottom={paddingBottom}>
                  <Block
                    id={index}
                    {...block}
                  />
                </VerticalPadding>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
