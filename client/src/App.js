import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

// change if your server runs elsewhere
const SOCKET_URL = 'http://localhost:5000';

const socket = io(SOCKET_URL);

export default function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [user, setUser] = useState('User' + Math.floor(Math.random()*1000));
  const messagesRef = useRef(null);

  useEffect(() => {
    socket.on('receive-message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('receive-message');
    };
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  function send() {
    if (!text.trim()) return;
    const msg = { user, text: text.trim(), timestamp: Date.now() };
    socket.emit('send-message', msg);
    setText('');
  }

  function onKey(e) {
    if (e.key === 'Enter') send();
  }

  return (
    <div className="container">
      <div className="header">Realtime Chat</div>
      <div className="chat-area" ref={messagesRef}>
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.user === user ? 'me' : 'other'}`}>
            <div className="meta">{m.user} • {new Date(m.timestamp).toLocaleTimeString()}</div>
            <div className="text">{m.text}</div>
          </div>
        ))}
      </div>

      <div className="controls">
        <input value={user} onChange={e => setUser(e.target.value)} className="user-input" />
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={onKey}
          placeholder="Type a message and press Enter"
          className="text-input"
        />
        <button onClick={send} className="send-btn">Send</button>
      </div>
    </div>
  );
}
