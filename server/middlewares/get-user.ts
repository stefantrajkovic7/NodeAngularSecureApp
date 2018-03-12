import {Request, Response, NextFunction} from "express";
import {decodeJwt} from "../helpers/security.utils";

export function retrieveUserIdFromRequest(req: Request, res: Response, next: NextFunction) {

  const jwt = req.cookies["SESSIONID"];

  if (jwt) {

    handleSessionCookie(jwt, req);


  }
  next();
}

async function handleSessionCookie(jwt: string, req: Request) {
  const payload = await decodeJwt(jwt);

  req["userId"] = payload.sub;

}
