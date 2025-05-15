import jwt from "jsonwebtoken";
import passport from "passport";
import { RequestHandler } from "express";
import { User } from "../models/User";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

export const register: RequestHandler = async (req, res, next) => {
    try {
        // check for validation error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array().map((err) => err.msg),
            });
            return;
        }

        const { email, password } = req.body;

        // Check if user already exists
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            password: hashedPassword,
            role: "user",
        });
        res.status(201).json({
            message: "User registered successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const signin: RequestHandler = async (req, res, next) => {
    // check for validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array().map((err) => err.msg) });
        return;
    }
    passport.authenticate(
        "local",
        { session: false },
        (err: Error | null, user: any, info: any) => {
            if (err) {
                return res.status(500).json({ message: err });
            }
            if (user) {
                // if the authentication done correctly , make new jwt for the client
                // gotta make accessToken and refreshToken tho
                const accessToken = jwt.sign(
                    {
                        userId: user.id,
                        role: user.role, // for frontend to authorize the user
                        tokenType: "access",
                    },
                    process.env.JWT_SECRET!,
                    { expiresIn: "15m" }
                );
                const refreshToken = jwt.sign(
                    {
                        userId: user.id,
                        tokenType: "refresh",
                    },
                    process.env.JWT_SECRET!,
                    { expiresIn: "7d" }
                );
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                });

                return res.status(200).json({
                    message: "Logged In Successfully",
                    accessToken,
                });
            }
        }
    )(req, res, next);
};

export const refresh: RequestHandler = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    jwt.verify(
        refreshToken,
        process.env.JWT_SECRET!,
        (err: Error | null, decoded: any) => {
            if (err) {
                res.status(403).json({ message: "Forbidden" });
                return;
            }
            const accessToken = jwt.sign(
                {
                    userId: decoded.userId,
                    role: decoded.role,
                    tokenType: "access",
                },
                process.env.JWT_SECRET!,
                { expiresIn: "15m" }
            );
            res.status(200).json({
                message: "Access Token generated successfully",
                accessToken,
            });
        }
    );
}
