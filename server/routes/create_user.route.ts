
import {Request, Response} from "express";
import * as argon2 from 'argon2';
import moment = require("moment");
import {validatePassword} from "../helpers/password-validation.helper";
import {db} from "../core/database";
import {createSessionToken} from "../helpers/security.utils";


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

  const passwordDigest = await argon2.hash(credentials.password);

  const user = db.createUser(credentials.email, passwordDigest);

  const sessionToken = await createSessionToken(user.id.toString());

  res.cookie("SESSIONID", sessionToken, {httpOnly: true});

  res.status(200).json({id: user.id, email: user.email});
}
