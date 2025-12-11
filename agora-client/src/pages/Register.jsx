import React, { useRef, useState } from 'react';

export default function Register(){
  const nameRef = useRef(); const emailRef = useRef(); const passRef = useRef();
  const [msg,setMsg] = useState('');
  const submit = async ()=>{
    const res = await fetch((import.meta.env.VITE_SERVER_URL||'http://localhost:5000') + '/auth/register', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ name:nameRef.current.value, email:emailRef.current.value, password:passRef.current.value })
    });
    const data = await res.json();
    if (res.ok) setMsg('Registered — please login'); else setMsg(data.error || JSON.stringify(data));
  };
  return (
    <div className="panel" style={{maxWidth:420}}>
      <h3>Create account</h3>
      <input ref={nameRef} placeholder="Name" style={{marginTop:10}} />
      <input ref={emailRef} placeholder="Email" style={{marginTop:10}} />
      <input ref={passRef} placeholder="Password" style={{marginTop:10}} type="password" />
      <button style={{marginTop:10}} onClick={submit}>Register</button>
      <div style={{marginTop:10,color:'var(--muted)'}}>{msg}</div>
    </div>
  )
}
