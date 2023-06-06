import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import io, { Socket } from 'socket.io-client'
import { ReactNode, useEffect, useState } from "react";
import MessageInput from './messageInput'
import Messages from './messages'

const inter = Inter({ subsets: ['latin'] })

export default function InternalMessages() {


  const [socket, setSocket] = useState<Socket>()
  const [messages, setMessages] = useState<string[]>([])

  const send = (value: string) => {
    socket?.emit('message', value)
  }

  useEffect(() => {
    const newSocket = io("http://localhost:8001")
    setSocket(newSocket)
  }, [setSocket])

  const messageListner = (message: string) => {
    setMessages([...messages, message])
  }

  useEffect(() => {
    socket?.on('message', messageListner)
    return () => { socket?.off('message', messageListner) }
  }, [messageListner])


  return (
    <>
      <main className={`${styles.main} ${inter.className} p-3`}>
        <div className={'row ml-5'}>
          <p className='p-5 text-primary'>
            Internal Messages
          </p>
          <div>
            <MessageInput send={send} />
            <Messages messages={messages} />
          </div>
        </div>
      </main>
    </>
  )
}
