import { AppError } from '@errors/AppError';
import { Api } from 'telegram';
import { client, session } from './SendCode';

export async function SignIn(phoneNumber: string, phoneCodeHash: string, phoneCode: string) {
  if (!phoneNumber || phoneNumber === '') throw new AppError('Usuário não está logado!');

  if (!phoneCode || phoneCode === '') throw new AppError('Destinatário não foi informado!');

  // client.session.setDC(2, '149.154.167.40', 80)

  await client.connect();

  await client.invoke(
    new Api.auth.SignIn({
      phoneNumber: phoneNumber,
      phoneCodeHash: phoneCodeHash,
      phoneCode: phoneCode,
    })
  ).catch((err) => {
    console.log(err)
    throw new AppError('kkkk')
  })

  return session.save();
}