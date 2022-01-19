import { SendCode } from "@services/SendCode";
import { SignIn } from "@services/SignIn";
import { Request, Response } from "express";
import { SendMessage } from "../services/SendMessage";

export class AuthController {
  async send(req: Request, res: Response): Promise<Response> {
    const session = req.headers.session.toString();
    const { user, message } = req.body;

    await SendMessage(session, user, message);

    return res.status(200).send();
  }

  async sendCode(req: Request, res: Response): Promise<Response> {
    const { phoneNumber } = req.body;

    const phoneCodeHash = await SendCode(phoneNumber);

    return res.status(200).json(phoneCodeHash);
  }

  async signIn(req: Request, res: Response): Promise<Response> {
    const { phoneNumber, phoneCodeHash, phoneCode } = req.body;

    const session = await SignIn(phoneNumber, phoneCodeHash, phoneCode);

    return res.status(200).json(session);
  }
}