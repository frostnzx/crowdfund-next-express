import express from "express";
import {
    getUsers,
    getUser,
    deleteUser,
    updateUser,
} from "../controllers/users";
import passport from "passport";
import { param } from "express-validator";
import authorize from "../middlewares/authorization";

const router = express.Router();

router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    authorize("admin"),
    getUsers
);
router.get(
    "/:id",
    param("id").notEmpty(),
    passport.authenticate("jwt", { session: false }),
    authorize("admin", "user"),
    getUser
);
router.put(
    "/:id",
    param("id").notEmpty(),
    passport.authenticate("jwt", { session: false }),
    authorize("admin", "user"),
    updateUser
);
router.delete(
    "/:id",
    param("id").notEmpty(),
    passport.authenticate("jwt", { session: false }),
    authorize("admin", "user"), // user can delete their own account
    deleteUser
);

export default router;
