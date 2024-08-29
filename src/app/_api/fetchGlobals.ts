import { useQuery } from '@apollo/client';
import type { Footer, Header, Settings } from '@/backend/types';
import { FOOTER_QUERY, HEADER_QUERY } from '../_graphql/globals';

// export function useFetchSettings() {
//   const { loading, error, data } = useQuery(SETTINGS_QUERY);
//   return { loading, error, data: data ? data.settings : undefined };
// }

export function useFetchHeader() {
  const { loading, error, data } = useQuery(HEADER_QUERY);
  return { loading, error, data: data ? data.header : undefined };
}

export function useFetchFooter() {
  const { loading, error, data } = useQuery(FOOTER_QUERY);
  return { loading, error, data: data ? data.footer : undefined };
}

export const useFetchGlobals = () => {
 // const { loading: loadingSettings, error: errorSettings, data: settings } = useFetchSettings();
  const { loading: loadingHeader, error: errorHeader, data: header } = useFetchHeader();
  const { loading: loadingFooter, error: errorFooter, data: footer } = useFetchFooter();

  const loading = loadingHeader || loadingFooter;
  const error = errorHeader || errorFooter;

  return {
    loading,
    error,
    data: {
      header,
      footer,
    },
  };
};
