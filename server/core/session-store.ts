import {Session} from "../models/session";
import {IUser} from "../../src/app/model/user.model";

export class SessionStore {
  private sessions: { [key: string]: Session } = {};

  createSession(sessionId: string, user: IUser) {
    this.sessions[sessionId] = new Session(sessionId, user);
  }
  findUserBySessionId(sessionId: string): IUser | undefined {
    const session = this.sessions[sessionId];

    return this.isSessionValid(sessionId) ? session.user : undefined;
  }

  isSessionValid(sessionId: string): boolean {
    const session = this.sessions[sessionId];

    return session && session.isValid();
  }

  destroySession(sessionId: string) {
    delete this.sessions[sessionId];
  }
}

export const sessionStore = new SessionStore();
