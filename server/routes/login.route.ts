import { Request, Response } from 'express';
import * as argon from 'argon2';
import {db} from "../core/database";
import {IUser} from "../models/db-user.model";
import {sessionStore} from "../core/session-store";
import {randomBytes} from "../helpers/security.utils";

export function login(req: Request, res: Response) {
  const credentials = req.body;

  const user =  db.findUserByEmail(credentials.email);

  if (!user) {
    res.sendStatus(403);
  } else {
    loginAndBuildResponse(credentials, user, res);
  }

}

async function loginAndBuildResponse(credentials: any, user: IUser, res: Response) {

  try {
    const sessionId = await attemptLogin(credentials, user);

    res.cookie("SESSIONID", sessionId, { httpOnly: true });
    res.status(200).json({id: user.id, email: user.email});
  } catch (err) {
    res.sendStatus(403);
  }

}

async function attemptLogin(credentials: any, user: IUser) {
  const isPasswordValid = await argon.verify(user.passwordDigest,
                                            credentials.password);

  if (!isPasswordValid) {
    throw new Error("Password Invalid");
  }

  const sessionId = await randomBytes(32).then(bytes => bytes.toString('hex'));

  sessionStore.createSession(sessionId, user);

  return sessionId;
}
