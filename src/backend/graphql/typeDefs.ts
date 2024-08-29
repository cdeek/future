import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Hello {
    hello: String!
  }
  type Header {
    navLinks: [String]
  }
  type Footer {
    navLinks: [String]
  }
  type User {
    _id: ID!
    name: String
    email: String!
    roles: [String!]
    password: String!
    updatedAt: String
    createdAt: String
  }
  type Page {
    _id: String
    title: String!
    publishedOn: String
    slug: String!
    meta: Meta
    updatedAt: String
    createdAt: String
    _status: String
  }

  type Meta {
    title: String
    description: String
    image: Media
  }

  type Review {
    _id: ID!
    rating: Int!
    content: String
    author: Author!
  }

  type Author {
    name: String
    email: String
  }

  type Media {
    _id: ID!
    alt: String
    caption: [String]
    updatedAt: String
    createdAt: String
    url: String
    filename: String
    mimeType: String
    filesize: Float
    width: Float
    height: Float
  }

  type Product {
    _id: ID!
    title: String
    publishedOn: String
    stripeProductID: String
    priceJSON: String
    categories: [String]
    relatedProducts: [String]
    skipSync: Boolean
    meta: ProductMeta
    sellerId: ID!
    updatedAt: String
    createdAt: String
    reviews: [Review!]
    medias: [Media!]
    _status: String
  }

  type ProductMeta {
    title: String
    description: String
    image: [Media!] 
    keywords: [String!]
  }

  type Query {
    hello: Hello
    users: [User]
    user(token: String!): User
    pages(limit: Int, load: Int, token: String): [Page]
    page(slug: String): Page
    products(limit: Int, load: Int, token: String): [Product]
    product(_id: ID!): Product
    reviews: [Review]
    medias: [Media]
    header: Header
    footer: Footer
  }

  type Mutation {
    addProduct(token: String!, product: AddProductInput!): Product
    deleteProduct(token: String!, id: ID!): Product
    updateProduct(token: String!, id: ID!, product: EditProductInput!): Product
  }

  input AddProductInput {
    _id: ID!
    title: String
    publishedOn: String
    stripeProductID: String
    priceJSON: String
    categories: [String]
    relatedProducts: [String]
    skipSync: Boolean
    meta: ProductMetaInput
    sellerId: ID!
    updatedAt: String
    createdAt: String
    _status: String
  }

  input EditProductInput {
    title: String
    publishedOn: String
    stripeProductID: String
    priceJSON: String
    categories: [String]
    relatedProducts: [String]
    skipSync: Boolean
    meta: ProductMetaInput
    _status: String
  }

  input ProductMetaInput {
    title: String
    description: String
    image: [MediaInput]
    keywords: [String]
  }

  input MediaInput {
    _id: ID!
    alt: String
    caption: [String]
    updatedAt: String
    createdAt: String
    url: String
    filename: String
    mimeType: String
    filesize: Float
    width: Float
    height: Float
  }
`;

export default typeDefs;
