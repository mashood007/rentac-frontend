import { useState } from "react"

interface Props {
  messages: string[]
}

export default function Messages({ messages }: Props) {
  const [value, setValeu] = useState<string>('')

  return (<div>
    {
      messages.map((message, index) =>
        <div key={index}>{message}</div>
      )
    }
  </div >)
}
