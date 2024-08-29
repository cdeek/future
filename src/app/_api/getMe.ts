import { useQuery } from '@apollo/client';

import type { User } from '@/backend/types';
import { ME_QUERY } from '../_graphql/me';
import { useAuth } from '../_providers/Auth';

export const getMe = () => {
  const { token, setToken } = useAuth();

  const { error, loading, data } = useQuery(ME_QUERY, {
    variables: {token}
  });

  if (error) setToken(undefined);

  return { error, loading, data };
}
