import React, { useState, useEffect } from 'react';
import { useAuth } from '../_providers/Auth';
import { useQuery } from '@apollo/client';
import { PAGES } from '../_graphql/pages';
import { PRODUCTS } from '../_graphql/products';
//import { ORDERS } from '../_graphql/orders';
import type { Config } from '@/backend/types';

const queryMap = {
  pages: {
    query: PAGES,
    key: 'pages',
  },
  products: {
    query: PRODUCTS,
    key: 'products',
  },
  orders: {
    query: "",
    key: 'orders',
  },
};

const useFetchDocs = <T>(collection: keyof Config['collections'], draft?: boolean) => {
  const { token } = useAuth();
  const [currentLoad, setCurrentLoad] = useState(1);

  if (!queryMap[collection]) throw new Error(`Collection ${collection} not found`);

  const userToken = token ? token : undefined;

  const { loading, error, data } = useQuery(queryMap[collection].query, {
    variables: {
      token: userToken,
      load: currentLoad,
      draft,
    },
  });

  const loadMore = () => {
    setCurrentLoad(prevLoad => prevLoad + 1);
  };

  return { loading, error, data: data ? data[queryMap[collection].key] : undefined, loadMore };
};

export default useFetchDocs;
