import {db} from "../core/database";

export function readAllLessons(req, res) {

      res.status(200).json({lessons: db.readAllLessons()});

}


