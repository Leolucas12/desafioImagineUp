import { AppError } from '@errors/AppError';
import { TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions';

export default {
  key: 'SendMessage',
  async handle({ data }) {
    const { session, user, message } = data;
    const client = new TelegramClient(new StringSession(session), parseInt(process.env.API_ID), process.env.API_HASH, {
      connectionRetries: 3,
    });

    await client.connect();

    if (!await client.checkAuthorization()) {
      throw new AppError('User is not logged in!')
    }

    await client.sendMessage(user, { message: message })
  },
};