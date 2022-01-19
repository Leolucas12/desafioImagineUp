import { AppError } from '@errors/AppError';
import { Api, TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';

export const session = new StringSession('')
export const client = new TelegramClient(session, parseInt(process.env.API_ID), process.env.API_HASH, {
  connectionRetries: 3,
});

export async function SendCode(phoneNumber: string) {
  if (!phoneNumber || phoneNumber === '') throw new AppError('Usuário não está logado!');

  // client.session.setDC(2, '149.154.167.40', 80)

  await client.connect();

  const result = await client.invoke(
    new Api.auth.SendCode({
      phoneNumber: phoneNumber,
      apiId: parseInt(process.env.API_ID),
      apiHash: process.env.API_HASH,
      settings: new Api.CodeSettings({
        allowFlashcall: true,
        currentNumber: true,
        allowAppHash: true,
      }),
    })
  ).catch((err) => {
    throw new AppError(err)
  })

  return result.phoneCodeHash;
}