import {db} from "../core/database";
import {sessionStore} from "../core/session-store";

export function readAllLessons(req, res) {

    const sessionId = req.cookies["SESSIONID"];

    const isSessionValid = sessionStore.isSessionValid(sessionId);

    if (!isSessionValid) {
      res.sendStatus(403);
    } else {
      res.status(200).json({lessons: db.readAllLessons()});
    }



}


