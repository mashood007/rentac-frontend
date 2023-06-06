import { useState } from "react"

export default function MessageInput({ send }: { send: (value: string) => void }) {
  const [value, setValue] = useState<string>('')

  return (<>
    <input placeholder="type your message" value={value} onChange={(e) => setValue(e.target?.value)} />
    <button onClick={() => send(value)} className={'btn btn-primary m-1'}>Send</button>
  </>)
}
