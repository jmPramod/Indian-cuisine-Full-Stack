import express, { NextFunction, Request, Response } from "express";
import { favoriteFood, login, register, updateUser } from "../controllers/auth.controller";
import { verifyUser } from "../middlewears/verify.token.middlewear";
import { uploadProfile } from "../middlewears/cloudinar.multer";



export const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.patch("/update-user/:id",verifyUser, uploadProfile.any(), updateUser);
authRoute.post("/register", register);
authRoute.post("/favorite/:userId", verifyUser,favoriteFood);
authRoute.get("/", (req, res) => {
  res.send("API working");
});

