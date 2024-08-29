import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query Products($load: Int, $token: String) {
    products(limit: 10, load: $load, token: $token) {
      _id
      title
      meta {
        image {
          url
        }
      }
      priceJSON
    }
  }
`;

export const PRODUCT = gql`
  query Product($id: ID!) {
    product(_id: $id) {
      _id
      title
      priceJSON
      reviews {
        _id
        rating
        content
        author {
          name
        }
      }
    }
  }
`;
