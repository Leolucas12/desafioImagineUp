import { AppError } from '@errors/AppError';
import { Api } from 'telegram';
import { client, session } from './SendCode';

export async function SignIn(phoneNumber: string, phoneCodeHash: string, phoneCode: string) {
  if (!phoneCode || phoneCode === '') throw new AppError('Código não foi infomrmado!');

  // client.session.setDC(2, '149.154.167.40', 80)

  await client.connect();

  await client.invoke(
    new Api.auth.SignIn({
      phoneNumber: phoneNumber,
      phoneCodeHash: phoneCodeHash,
      phoneCode: phoneCode,
    })
  ).catch((err) => {
    throw new AppError(err)
  })

  return session.save();
}