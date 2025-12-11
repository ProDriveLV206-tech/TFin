import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function Navbar(){
  const navigate = useNavigate();
  const logout = ()=>{ localStorage.removeItem('token'); localStorage.removeItem('name'); navigate('/login'); };
  return (
    <div className="nav">
      <div className="brand">AGORA</div>
      <div style={{display:'flex',gap:12,alignItems:'center'}}>
        <Link to="/">Chat</Link>
        <Link to="/games">Games</Link>
        <a href="#" onClick={(e)=>{e.preventDefault(); logout();}}>Logout</a>
      </div>
    </div>
  );
}
