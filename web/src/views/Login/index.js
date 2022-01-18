import React, { useEffect, useRef } from 'react';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';

export default function Login() {
  const apiId = 16531657;
  const apiHash = "8921d39a7674bcfc9082f8a993e91b75";
  const phone = useRef(null);
  const phoneSend = useRef(null);
  const codeDiv = useRef(null);
  const code = useRef(null);
  const codeSend = useRef(null);

  useEffect(() => {
    function phoneCallback() {
      phone.current.disabled = false;
      phoneSend.current.disabled = false;

      return new Promise((resolve) => {
        phoneSend.current.addEventListener("click", function () {
          phone.current.disabled = true;
          phoneSend.current.disabled = true;
          resolve(phone.current.value);
        });
      });
    }

    function codeCallback() {
      code.current.disabled = false;
      codeSend.current.disabled = false;

      codeDiv.current.style.visibility = "visible";

      return new Promise((resolve) => {
        codeSend.current.addEventListener("click", function () {
          code.current.disabled = true;
          codeSend.current.disabled = true;
          resolve(code.current.value);
        });
      });
    }

    const session = new StringSession('')

    const client = new TelegramClient(session, apiId, apiHash, {
      connectionRetries: 3,
    }); // you can pass a string session here from previous logins.
    // If you want to run this example in the test servers uncomment this line
    client.session.setDC(2, '149.154.167.40', 80)

    client
      .start({
        phoneNumber: phoneCallback,
        phoneCode: codeCallback,
        onError: (err) => console.log(err),
      })
      .then(() => {
        localStorage.setItem('telegram:token', session.save())
        console.log(
          "%c your string session is " + session.save(),
          "color:#B54128"
        );
      })
      .catch((e) => {
        console.log("AN ERROR HAS HAPPENED");
        console.log(e.toString());
      });
  }, [])

  return (
    <form>
      <div>
        <label>phone number</label> <input disabled type="text" ref={phone} />
        <button type="button" disabled ref={phoneSend}>Send</button>
      </div>
      <div ref={codeDiv} style={{ visibility: 'hidden' }}>
        <label>code you recieved</label> <input type="text" ref={code} />
        <button type="button" ref={codeSend}>Send</button>
      </div>
    </form>
  )
}