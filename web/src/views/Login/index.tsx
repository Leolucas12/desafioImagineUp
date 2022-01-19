import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

export function Login() {
  const history = useHistory();
  const [phone, setPhone] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [phoneCodeHash, setPhoneCodeHash] = useState('');

  function getCode() {
    api.post('/getCode', {
      phoneNumber: phone
    })
      .then(({ data }) => {
        console.log(data)
        setPhoneCodeHash(data);
      }).catch((err) => {
        if (err.response.status === 400) {
          console.log(err.response.data.message)
        }
      })
  }

  function signIn() {
    api.post('/signIn', {
      phoneNumber: phone,
      phoneCodeHash: phoneCodeHash,
      phoneCode: phoneCode,
    }).then(({ data }) => {
      localStorage.setItem('telegram:token', data)
      history.push('/chat')
    })
  }

  return (
    <form>
      <div>
        <label>Telefone</label> <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
        <button type="button" onClick={getCode}>Enviar Código</button>
      </div>
      <div>
        <label>Código</label> <input type="text" value={phoneCode} onChange={e => setPhoneCode(e.target.value)} />
        <button type="button" onClick={signIn}>Entrar</button>
      </div>
    </form>
  )
}