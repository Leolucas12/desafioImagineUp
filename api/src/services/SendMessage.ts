import { AppError } from '@errors/AppError';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';

export async function SendMessage(session: string, user: string, message: string) {
  if (!session || session === '') throw new AppError('Usuário não está logado!');

  if (!user || user === '') throw new AppError('Destinatário não foi informado!');

  if (!message || message === '') throw new AppError('Conteúdo da mensagem não pode ser vazio!');

  const client = new TelegramClient(new StringSession(session), parseInt(process.env.API_ID), process.env.API_HASH, {
    connectionRetries: 3,
  });

  await client.connect();

  if (!await client.checkAuthorization()) {
    throw new AppError('Usuário não está logado!')
  }

  await client.sendMessage(user, { message: message })
  .catch(() => {
    throw new AppError('Erro interno');
  })
}