import "bootstrap/dist/css/bootstrap.min.css";
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactNode, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import AuthGuard from "@/@cores/guards/authGuard";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);


  type GuardProps = {
    children: ReactNode
  }

  const Guard = ({ children }: GuardProps) => {
    return <AuthGuard fallback={<div>loading..</div>}>{children}</AuthGuard>
  }

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Guard>
        <Component {...pageProps} />
      </Guard>
    </QueryClientProvider>
  )
}
