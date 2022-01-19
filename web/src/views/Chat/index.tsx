import React, { useState } from 'react';
import api from '../../services/api';

export function Chat() {
  const [username, setUsername] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState('');

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    setResponse('')
    api.post('/send', {
      user: username,
      message: message
    }, {
      headers: { 'session': localStorage.getItem('telegram:token') },
    }).then(() => {
      setResponse('Mensagem enviada com sucesso!')
    })
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className='label-input'>
          <label>Telefone ou username</label>
          <input type="text" placeholder='+55999999999 ou username' value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className='label-input'>
          <label>Mensagem</label>
          <input placeholder='Olá {criativo da comunidade}' value={message} onChange={e => setMessage(e.target.value)} />
          <p>{response}</p>
        </div>
        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  )
}