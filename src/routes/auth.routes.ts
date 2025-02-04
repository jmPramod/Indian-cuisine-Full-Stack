import express, { NextFunction, Request, Response } from "express";
import { login, register, updateUser } from "../controllers/auth.controller";
import { verifyUser } from "../middlewears/verify.token.middlewear";



export const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.patch("/update-user",verifyUser, updateUser);
authRoute.post("/register", register);
authRoute.get("/", (req, res) => {
  res.send("API working");
});

