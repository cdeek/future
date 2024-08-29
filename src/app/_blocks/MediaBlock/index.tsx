import React from 'react'
import { StaticImageData } from 'next/image'

import { Page } from '@/backend/types'
import { Gutter } from '@/app/_components/Gutter'
import { Media } from '@/app/_components/Media'
import RichText from '@/app/_components/RichText'

import './style.css'

type Props = Extract<Page['layout'][0], { blockType: 'mediaBlock' }> & {
  staticImage?: StaticImageData
  id?: string
}

export const MediaBlock: React.FC<Props> = props => {
  const { media, position = 'default', staticImage } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div className="mediaBlock">
      {position === 'fullscreen' && (
        <div className="fullscreen">
          <Media resource={media} src={staticImage} />
        </div>
      )}
      {position === 'default' && (
        <Gutter>
          <Media resource={media} src={staticImage} />
        </Gutter>
      )}
      {caption && (
        <Gutter className="caption">
          <RichText content={caption} />
        </Gutter>
      )}
    </div>
  )
}
