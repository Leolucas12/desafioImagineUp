import { AppError } from "@errors/AppError";
import { Request, Response } from "express";
import Queue from "lib/Queue";

export class AuthController {
  async send(req: Request, res: Response): Promise<Response> {
    const { session, user, message } = req.body;

    if (!session) throw new AppError('User is not logged in!');

    if (!user) throw new AppError('Receiver was not informed!');

    if (!message || message === '') throw new AppError('Message content cannot be empty!');

    await Queue.add('SendMessage', { session, user, message });

    return res.status(200).send()
  }
}