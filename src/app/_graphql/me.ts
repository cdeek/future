import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query {
    user {
      _id
      email
      name
      roles
      CART
    }
    exp
}`
