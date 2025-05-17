import express from "express";
import { body, cookie } from "express-validator";
import { register, signin , signout , profile , refresh} from "../controllers/auth";
import passport from "passport";

const router = express.Router();

router.post(
    "/register",
    [
        body("email").isEmail().notEmpty().withMessage("Invalid email address"),
        body("username").notEmpty().withMessage("Username is required"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be atleast 6 characters long")
            .notEmpty()
            .withMessage("Password is required"),
    ],
    register
);

router.post(
    "/signin",
    [
        body("email").isEmail().notEmpty().withMessage("Invalid email address"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    signin
);
router.post(
    "/signout",
    signout
)
router.get(
    "/profile",
    [
        passport.authenticate("jwt", { session: false }),
    ],
    profile
)
router.post(
    "/refresh",
    [
        cookie("refreshToken").notEmpty().withMessage("Refresh token is required"),
    ],
    refresh
  )

export default router;
