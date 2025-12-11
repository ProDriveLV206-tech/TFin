import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const emailRef = useRef(); const passRef = useRef(); const [err, setErr] = useState(''); const navigate = useNavigate();
  const submit = async ()=>{
    const res = await fetch((import.meta.env.VITE_SERVER_URL||'http://localhost:5000')+'/auth/login', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email: emailRef.current.value, password: passRef.current.value })
    });
    const data = await res.json();
    if (res.ok && data.token) { localStorage.setItem('token', data.token); localStorage.setItem('name', data.name || 'You'); navigate('/'); }
    else setErr(data.error || 'Login failed');
  };
  return (
    <div className="panel" style={{maxWidth:420}}>
      <h3>Login</h3>
      <input ref={emailRef} placeholder="Email" style={{marginTop:10}} />
      <input ref={passRef} placeholder="Password" style={{marginTop:10}} type="password" />
      <button style={{marginTop:10}} onClick={submit}>Login</button>
      <div style={{marginTop:10,color:'var(--muted)'}}>{err}</div>
    </div>
  )
}
