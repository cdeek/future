import { gql } from '@apollo/client';

export const HEADER_QUERY = gql`
  query Header {
    header {
      navLinks {
        title
        url
      }
    }
  }
`;

export const FOOTER_QUERY = gql`
  query Footer {
    footer {
      navLinks {
        title
        url
      }
    }
  }
`;
