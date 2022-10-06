import '../styles/globals.css';
import React, { useRef } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HOC from '../components/layouts/hoc';
import useHasMounted from '../hooks/useMounted';
import ErrorBoundary from '../components/errorboundary';
import { DefaultSeo } from '../components/SEO/default-seo';
import { ManagedUIContext } from 'src/context/uicontext';

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<any>();
  const router = useRouter();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 2,
        },
      },
    });
  }
  const Layout = (Component as any).Layout || HOC;
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps?.dehydratedState}>
          <ManagedUIContext>
            <DefaultSeo />
            <Layout pageProps={pageProps}>
              <Component {...pageProps} key={router.route} />
            </Layout>
          </ManagedUIContext>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default CustomApp;
