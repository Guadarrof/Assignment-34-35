import express from "express"
import { createNote, deleteNote, editNote, listNotes, readNote } from "../controller/notesController.js";
import { body, param } from "express-validator";
import { validationErrorRes } from "../middleware/validations.js";

const route = express.Router()

route
    .post("/create", 
        [
            body("title").isString().isLength({min:1}).withMessage("La nota requiere un titulo"),
            body("note").isString().isLength({min:1}).withMessage("La nota requiere contenido"),
            validationErrorRes
        ],
     createNote)
    .get("/note-list", listNotes)
    .get("/read-note/:id", readNote)
    .put("/edit/:id",
        [
            param("id").isLength({min:24, max:24}),
            validationErrorRes
        ]
    , editNote)
    .delete("/delete/:id", deleteNote)

export default route;