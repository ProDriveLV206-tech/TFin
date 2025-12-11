import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { socket } from './sockets';
import Chat from './pages/Chat';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function AppShell(){
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    socket.on('message', m => setMessages(prev=>[...prev,m]));
    socket.on('forceDisconnect', d=>{ alert(d?.reason || 'Disconnected'); socket.disconnect(); localStorage.removeItem('token'); navigate('/login'); });
    return ()=>{ socket.off('message'); socket.off('forceDisconnect'); };
  },[]);

  return (
    <div className="app">
      <Navbar/>
      <div className="content">
        <div className="left panel">
          <Chat messages={messages} onSend={(t)=> socket.emit('sendMessage', { text: t, name: localStorage.getItem('name')||'You' })} />
        </div>
        <div className="right">
          <Admin />
        </div>
      </div>
    </div>
  );
}

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<ProtectedRoute><AppShell/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
