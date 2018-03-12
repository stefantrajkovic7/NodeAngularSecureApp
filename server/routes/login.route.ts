import { Request, Response } from 'express';
import {sessionStore} from "../core/session-store";
import {db} from "../core/database";
import {IUser} from "../models/db-user.model";

export function login(req: Request, res: Response) {
  const credentials = req.body;

  const user =  db.findUserByEmail(credentials.email);

  if (!user) {
    res.sendStatus(403);
  } else {
    attemptLogin(credentials, user)
      .then(() => {

      })
      .catch(() => res.sendStatus(403));
  }

}

async function attemptLogin(credentials: any, user: IUser) {

}
