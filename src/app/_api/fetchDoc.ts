import { useQuery } from '@apollo/client';
import type { Config } from '@/backend/types';
import { PAGE } from '../_graphql/pages';
import { PRODUCT } from '../_graphql/products';

const queryMap = {
  pages: {
    query: PAGE,
    key: 'page',
  },
  products: {
    query: PRODUCT,
    key: 'product',
  },
};

const useFetchDoc = async <T>(args: {
  collection: keyof Config['collections'];
  slug?: string;
  id?: string;
  draft?: boolean;
}) => {
  const { collection, slug, id, draft } = args || {};

  if (!queryMap[collection]) throw new Error(`Collection ${collection} not found`);

  const variables: { slug?: string; id?: string; draft?: boolean } = {};

  if (slug) variables.slug = slug;
  if (id) variables.id = id;
  if (draft) variables.draft = draft;

  const { loading, error, data } = useQuery(queryMap[collection].query, {
    variables,
  });

  return { loading, error, data };
};

export default useFetchDoc;