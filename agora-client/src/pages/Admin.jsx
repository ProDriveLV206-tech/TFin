import React, { useEffect, useState } from 'react';

export default function Admin(){
  const [stats,setStats] = useState({users:0,messages:0}); const [users,setUsers]=useState([]); const [socketId,setSocketId]=useState('');
  useEffect(()=>{ fetch((import.meta.env.VITE_SERVER_URL||'http://localhost:5000') + '/admin/stats', { headers:{ Authorization:'Bearer ' + localStorage.getItem('token') } }).then(r=>r.json()).then(setStats).catch(()=>{}); },[]);
  const loadUsers = async ()=>{ const res = await fetch((import.meta.env.VITE_SERVER_URL||'http://localhost:5000') + '/admin/users', { headers:{ Authorization:'Bearer ' + localStorage.getItem('token') } }); const data = await res.json(); setUsers(data); };
  const doKick = async ()=>{ if(!socketId) return alert('socketId required'); await fetch((import.meta.env.VITE_SERVER_URL||'http://localhost:5000') + '/admin/kick', { method:'POST', headers:{ 'Content-Type':'application/json', Authorization:'Bearer ' + localStorage.getItem('token') }, body: JSON.stringify({ socketId, reason: 'Kicked' }) }); alert('Kick sent'); };
  const doBan = async (userId)=>{ await fetch((import.meta.env.VITE_SERVER_URL||'http://localhost:5000') + '/admin/ban', { method:'POST', headers:{ 'Content-Type':'application/json', Authorization:'Bearer ' + localStorage.getItem('token') }, body: JSON.stringify({ userId, reason:'Violation' }) }); alert('Banned'); };
  return (
    <div className="panel" style={{padding:16}}>
      <h3>Admin Panel</h3>
      <div style={{marginTop:10}}><div style={{color:'var(--muted)'}}>Users</div><div style={{fontSize:20}}>{stats.users}</div></div>
      <div style={{marginTop:10}}><div style={{color:'var(--muted)'}}>Messages</div><div style={{fontSize:20}}>{stats.messages}</div></div>
      <div style={{marginTop:14}}><button onClick={loadUsers}>Load Users</button>
        <div style={{marginTop:8}}><input placeholder="socketId" value={socketId} onChange={e=>setSocketId(e.target.value)} /><button onClick={doKick} style={{marginLeft:8}}>Kick</button></div>
      </div>
      <div style={{marginTop:10}}>{users.slice(0,50).map(u=> <div key={u._id} style={{padding:8,borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between'}}><div><div style={{fontWeight:600}}>{u.name||u.email}</div><div style={{color:'var(--muted)',fontSize:12}}>{u.email}</div></div><div><button onClick={()=>doBan(u._id)}>Ban</button></div></div>)}</div>
    </div>
  )
}
