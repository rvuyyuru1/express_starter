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
import Loader from '@components/layouts/loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthLayout from '@components/layouts/authlayout';
//
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
            <Loader>
              <AuthLayout>
                <Layout pageProps={pageProps}>
                  <Component {...pageProps} key={router.route} />
                </Layout>
              </AuthLayout>
            </Loader>
            <ToastContainer />
          </ManagedUIContext>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default CustomApp;
