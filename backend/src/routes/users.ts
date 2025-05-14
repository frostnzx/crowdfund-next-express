import express from "express";
import {
    getUsers,
    getUser,
    deleteUser,
    updateUser,
} from "../controllers/users";
import passport from "passport";
import { param } from "express-validator";

const router = express.Router();

// dont forget to add authorization for only admin later
router.get("/", passport.authenticate("jwt", { session: false }), getUsers); 
router.get(
    "/:id",
    param("id").notEmpty(),
    passport.authenticate("jwt", { session: false }),
    getUser
);
router.put(
    "/:id",
    param("id").notEmpty(),
    passport.authenticate("jwt", { session: false }),
    updateUser
);
router.delete(
    "/:id",
    param("id").notEmpty(),
    passport.authenticate("jwt", { session: false }),
    deleteUser
);

export default router;
