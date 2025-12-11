import React, { useRef } from 'react';

export default function Chat({ messages, onSend }){
  const inputRef = useRef();
  return (
    <>
      <h2 style={{marginBottom:8}}>Chat</h2>
      <div className="chatBox">
        {messages.map((m,i)=> <div key={i} className="msg"><strong style={{color:'white'}}>{m.senderName||m.name||'Anon'}:</strong> {m.text}</div>)}
      </div>
      <div style={{marginTop:10}} className="inputRow">
        <input ref={inputRef} placeholder="Type a message..." />
        <button onClick={()=>{ onSend(inputRef.current.value); inputRef.current.value=''; }}>Send</button>
      </div>
    </>
  )
}
