import React, { useState } from 'react';
import api from '../../services/api';

export function Chat() {
  const [username, setUsername] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<any>();

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    api.post('/send', {
      user: username,
      message: message
    }, {
      headers: { 'session': localStorage.getItem('telegram:token') },
    })
  }

  function handleMessages(): void {
    api.get('/index', {
      headers: { 'session': localStorage.getItem('telegram:token') },
      params: {
        user: username
      }
    }).then(({data}) => {
      setMessages(data);
      console.log(data)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Telefone ou username</label>
        <input type="text" placeholder='+55999999999 ou username' value={username} onChange={e => setUsername(e.target.value)} onBlur={handleMessages} />
      </div>
      <div>
        <label>Mensagem</label>
        <input placeholder='Olá {criativo da comunidade}' value={message} onChange={e => setMessage(e.target.value)} />
      </div>
      <button type="submit">Enviar mensagem</button>
    </form>
  )
}