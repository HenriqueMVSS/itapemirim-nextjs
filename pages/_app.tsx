import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../src/layout/Layout'
import { ApolloProvider, apolloClient } from '../src/apolloClient'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </ApolloProvider>
    )
  }
  