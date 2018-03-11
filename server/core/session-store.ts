import {Session} from "../models/session";
import {IUser} from "../../src/app/model/user.model";

export class SessionStore {
  private sessions: { [key: string]: Session } = {};

  createSession(sessionId: string, user: IUser) {
    this.sessions[sessionId] = new Session(sessionId, user);
  }
  findUserBySessionId(sessionId: string): IUser | undefined {
    const session = this.sessions[sessionId];

    const isSessionValid = session && session.isValid();

    return isSessionValid ? session.user : undefined;
  }

}

export const sessionStore = new SessionStore();
