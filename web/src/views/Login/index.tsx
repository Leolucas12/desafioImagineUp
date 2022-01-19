import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

export function Login() {
  const history = useHistory();
  const [phone, setPhone] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [phoneCodeHash, setPhoneCodeHash] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (localStorage.getItem('telegram:token')) history.push('/chat');
  }, [history])

  function getCode() {
    setResponse('')
    api.post('/getCode', {
      phoneNumber: phone
    })
      .then(({ data }) => {
        setPhoneCodeHash(data);
      }).catch((err) => {
        if (err.response.status === 400) {
          setResponse(err.response.data.message);
        }
      })
  }

  function signIn() {
    setResponse('')
    api.post('/signIn', {
      phoneNumber: phone,
      phoneCodeHash: phoneCodeHash,
      phoneCode: phoneCode,
    }).then(({ data }) => {
      localStorage.setItem('telegram:token', data)
      history.push('/chat')
    }).catch((err) => {
      setResponse(err.response.data.message);
    })
  }

  return (
    <div className='container'>
      <form>
        {phoneCodeHash === '' &&
          <div className='label-input'>
            <label>Telefone</label> <input type="text" placeholder='+55XXXXXXXXXXX' value={phone} onChange={e => setPhone(e.target.value)} />
            <p>{response}</p>
            <button type="button" onClick={getCode}>Enviar Código</button>
          </div>
        }
        {phoneCodeHash !== '' &&
          <div className='label-input'>
            <label>Código</label> <input type="text" placeholder='XXXXX' value={phoneCode} onChange={e => setPhoneCode(e.target.value)} />
            <p>{response}</p>
            <button type="button" onClick={signIn}>Entrar</button>
          </div>
        }
      </form>
    </div>
  )
}