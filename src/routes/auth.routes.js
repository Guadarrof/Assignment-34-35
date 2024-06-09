import express from "express"
import { createUser, deleteUser, editUser, listUsers } from "../controller/userController.js";
import { body, param } from "express-validator";
import { validationErrorRes } from "../middleware/validations.js";

const route = express.Router()

route
    .post("/create", 
        [
            body("userName").isString().isLength({min:1}).withMessage("El nombre de usuario es requerido"),
            body("email").isEmail().withMessage("El email es requerido"),
            body("password")
            .isString().isLength({min:1}).withMessage("La password es requerida.")
            .bail()
            .isLength({ min: 8}).withMessage("La password debe tener al menos 8 caracteres."),
            validationErrorRes
        ],
     createUser)
    .get("/list-users", listUsers )
    .put("/edit-user/:id",
        [
            param("id").isLength({min:24, max:24}),
            validationErrorRes
        ]
    , editUser)
    .delete("/delete-user/:id", deleteUser)

export default route;