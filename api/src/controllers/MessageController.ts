import { Request, Response } from "express";
import Queue from "lib/Queue";

export class AuthController {
  async send(req: Request, res: Response): Promise<Response> {
    const { session, user, message } = req.body;
    await Queue.add('SendMessage', { session, user, message });
    return res.status(200)
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { session } = req.body;
    return res.status(200).json(session)
  }
}