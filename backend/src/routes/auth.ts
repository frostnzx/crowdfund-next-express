import express from "express";
import { body, cookie } from "express-validator";
import { register, signin , refresh} from "../controllers/auth";

const router = express.Router();

router.post(
    "/register",
    [
        body("email").isEmail().notEmpty().withMessage("Invalid email address"),
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
    "/refresh",
    [
        cookie("refreshToken").notEmpty().withMessage("Refresh token is required"),
    ],
    refresh
  )

export default router;
