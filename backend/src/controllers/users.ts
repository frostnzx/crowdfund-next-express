import { RequestHandler } from "express";
//import User from "../models/User";

export const getUsers: RequestHandler = async (req, res, next) => {
    res.status(200).json({
        message: "Get all users",
    });
};

export const getUser: RequestHandler = async (req, res, next) => {};

export const updateUser: RequestHandler = async (req, res, next) => {};

export const deleteUser: RequestHandler = async (req, res, next) => {};
