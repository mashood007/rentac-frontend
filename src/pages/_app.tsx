import "bootstrap/dist/css/bootstrap.min.css";
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactNode, useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import AuthGuard from "@/@cores/guards/authGuard";
// import io, { Socket } from 'socket.io-client'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // const [socket, setSocket] = useState<Socket>()
  // const [messages, setMessages] = useState<string[]>([])

  // const send = (value: string) => {
  //   socket?.emit('message', value)
  // }

  // useEffect(() => {
  //   const newSocket = io("http://localhost:8001")
  //   setSocket(newSocket)
  // }, [setSocket])

  // const messageListner = (message: string) => {
  //   setMessages([...messages, message])
  // }

  // useEffect(() => {
  //   socket?.on('message', messageListner)
  //   return () => { socket?.off('message', messageListner) }
  // }, [messageListner])

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
