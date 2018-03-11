import { Request, Response} from "express";
import { db } from "../core/database";
import { USERS } from "../core/database-data";
import * as argon from 'argon2';
import { validatePassword } from "../helpers/password-validation.helper";
import {randomBytes} from "../helpers/security.utils";

export function createUser(req: Request, res: Response) {
  const credentials = req.body;
  const errors = validatePassword(credentials.password);

  if (errors.length > 0) {
    res.status(400).json({errors});
  } else {
      createUserAndSession(res, credentials);
  }

}

async function createUserAndSession(res: Response, credentials) {

  const passwordDigest = await argon.hash(credentials.password);

  const user = db.createUser(credentials.email, passwordDigest);

  const sessionId = await randomBytes(32).then(bytes => bytes.toString('hex'));

  console.log(USERS);
  console.log(sessionId, "sessionId");

  res.status(200).json({id: user.id, email: user.email});

}
