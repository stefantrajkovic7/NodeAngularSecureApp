
import * as _ from 'lodash';
import {LESSONS, USERS} from "./database-data";
import {IUser} from "./db-user.model";


class InMemoryDatabase {
    userCounter = 0;

    static readAllLessons() {
        return _.values(LESSONS);
    }

    createUser(email: string, password: string) {
      const id = this.userCounter++;

      const user: IUser = {
        id,
        email,
        password
      };

      USERS[id] = user;

      return user;
    }

}

export const db = new InMemoryDatabase();
