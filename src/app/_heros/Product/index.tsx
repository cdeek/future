import React, { Fragment } from 'react'
import Link from 'next/link'

import { Product } from '@/backend/types'
import { AddToCartButton } from '@/app/_components/AddToCartButton'
import { Gutter } from '@/app/_components/Gutter'
import { Media } from '@/app/_components/Media'
import { Message } from '@/app/_components/Message'
import { Price } from '@/app/_components/Price'
import RichText from '@/app/_components/RichText'

import classes from './index.module.scss'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const {
    _id,
    stripeProduct,
    title,
    categories,
    meta: { image: metaImage, description } = {},
  } = product

  return (
    <Fragment>
      {!stripeProduct && (
        <Gutter>
          <Message
            className="warning"
            warning={
              <Fragment>
                {'This product is not yet connected to Stripe. To link this product, '}
                <Link
                  href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/products/${}`}
                >
                  edit this product in the admin panel
                </Link>
                {'.'}
              </Fragment>
            }
          />
        </Gutter>
      )}
      <Gutter className="productHero">
        <div className="content">
          <div className="categories">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <Fragment key={index}>
                    {titleToUse}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              }

              return null
            })}
          </div>
          <h1 className="title">{title}</h1>
          <div>
            <p className="description">
              {`${description ? `${description} ` : ''}To edit this product, `}
              <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/products/${}`}>
                navigate to the admin dashboard
              </Link>
              {'.'}
            </p>
          </div>
          <Price product={product} button={false} />
          <AddToCartButton product={product} className="addToCartButton" />
        </div>
        <div className="media">
          <div className="mediaWrapper">
            {!metaImage && <div className="placeholder">No image</div>}
            {metaImage && typeof metaImage !== 'string' && (
              <Media imgClassName="image" resource={metaImage} fill />
            )}
          </div>
          {metaImage && typeof metaImage !== 'string' && metaImage?.caption && (
            <RichText content={metaImage.caption} className="caption" />
          )}
        </div>
      </Gutter>
    </Fragment>
  )
}
