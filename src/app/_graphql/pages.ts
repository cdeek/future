import { gql } from '@apollo/client';

export const PAGES = gql`
  query Pages($load: Int, $token: String) {
    pages(limit: 10, load: $load) {
      slug
    }
  }
`;

export const PAGE = gql`
  query Page($slug: String) {
    page(slug: $slug) {
      title
    }
  }
`;
