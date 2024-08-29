export type CartItems =
  | {
      product?: (string | null) | Product
      quantity?: number | null
      id?: string | null
    }[]
  | null

interface Meta {
  title?: string | null
  description?: string | null
  image?: string | Media | null
}

export interface Config {
  collections: {
    pages: Page
    products: Product
    orders: Order
    media: Media
    categories: Category
    users: User
  }
  globals: {
    settings: Settings
    header: Header
    footer: Footer
  }
}

export interface Page {
  _id: string
  title: string
  publishedOn?: string | null
  hero: {
    type: 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact'
    richText: {
      [k: string]: unknown
    }[]
    links?:
      | {
          link: {
            type?: ('reference' | 'custom') | null
            newTab?: boolean | null
            reference?: {
              relationTo: 'pages'
              value: string | Page
            } | null
            url?: string | null
            label: string
            appearance?: ('default' | 'primary' | 'secondary') | null
          }
          id?: string | null
        }[]
      | null
    media?: string | Media | null
  }
  slug?: string | null
  meta?: Meta
  updatedAt: string
  createdAt: string
  _status?: 'draft' | 'published' | null
}

export interface Media {
  _id: string
  alt: string
  caption?: { [k: string]: unknown }[] | null
  updatedAt: string
  createdAt: string
  url?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
}

export interface Product {
  _id: string
  title: string
  publishedOn?: string | null
  stripeProductID?: string | null
  priceJSON?: string | null
  categories?: (string | Category)[] | null
  relatedProducts?: (string | Product)[] | null
  skipSync?: boolean | null
  meta?: {
    title?: string | null
    description?: string | null
    image?: string | Media | null
    keywords?: string[] | null
  }
  sellerId: string
  updatedAt: string
  createdAt: string
  _status?: ('draft' | 'published') | null
}

export interface User {
  _id: string
  name?: string | null
  roles?: ('admin' | 'customer')[] | null
  purchases?: (string | Product)[] | null
  stripeCustomerID?: string | null
  cart?: { items?: CartItems }
  skipSync?: boolean | null
  updatedAt: string
  createdAt: string
  email: string
  resetPasswordToken?: string | null
  resetPasswordExpiration?: string | null
  salt?: string | null
  hash?: string | null
  loginAttempts?: number | null
  lockUntil?: string | null
  password: string | null
}

export interface Category {
  id: string
  title?: string | null
  parent?: (string | null) | Category
  breadcrumbs?:
    | {
        doc?: (string | null) | Category
        url?: string | null
        label?: string | null
        id?: string | null
      }[]
    | null
  updatedAt: string
  createdAt: string
}

export interface Order {
  id: string
  orderedBy?: (string | null) | User
  stripePaymentIntentID?: string | null
  total: number
  items?:
    | {
        product: string | Product
        price?: number | null
        quantity?: number | null
        id?: string | null
      }[]
    | null
  updatedAt: string
  createdAt: string
}

export interface Settings {
  id: string
  productsPage?: (string | null) | Page
  updatedAt?: string | null
  createdAt?: string | null
}

export interface Header {
  id: string
  navItems?:
    | {
        link: {
          type?: ('reference' | 'custom') | null
          newTab?: boolean | null
          reference?: {
            relationTo: 'pages'
            value: string | Page
          } | null
          url?: string | null
          label: string
        }
        id?: string | null
      }[]
    | null
  updatedAt?: string | null
  createdAt?: string | null
}

export interface Footer {
  id: string
  navItems?:
    | {
        link: {
          type?: ('reference' | 'custom') | null
          newTab?: boolean | null
          reference?: {
            relationTo: 'pages'
            value: string | Page
          } | null
          url?: string | null
          label: string
        }
        id?: string | null
      }[]
    | null
  updatedAt?: string | null
  createdAt?: string | null
}