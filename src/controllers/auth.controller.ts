import express, { NextFunction, Request, Response } from "express";

import { ValidationError } from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Auth from "../models/auth.schema";

import createError from "../middlewears/error.middlewear";
import { RegisterSchemaValidation } from "../validations/validations";
import { envFiles } from "../helper/helper";
envFiles();
import dotenv from "dotenv";
dotenv.config();
const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const emailExist = await Auth.findOne({
      email: req.body.email,
    });

    if (emailExist) {
      return next(createError(401, "This Email is already in use."));
    }
    const phoneExist = await Auth.findOne({
      phone: req.body.phone,
    });

    if (phoneExist) {
      return next(createError(401, "This Phone Number is already in use."));
    }

    const { error, value } = RegisterSchemaValidation.validate(req.body);

    if (error) {
      return next(createError(401, error.details[0].message));
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    value.password = hashPassword;

    const newBank = new Auth(value);
    let savedUser = await newBank.save();
    // JWT token generation
    const token = jwt.sign(
      { email: savedUser.email, id: savedUser._id,roal:savedUser.isAdmin },
      process.env.SECRET_KEY as string
    );

    res.cookie("Bearer", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      secure: true,
    });
    res.json({
      data: {
        token: token,
        user: savedUser,
      },
      status: 201,
      message: "New User created",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    //validation
    const userExist = await Auth.findOne({ email: email });
    if (!userExist) {
      return next(createError(404, "Invalid User."));
    }
    const isPassword = await bcrypt.compare(password, userExist.password);
    if (!isPassword) {
      return next(createError(404, "Invalid Password."));
    }
    // JWT token generation
    const token = jwt.sign(
      { email: userExist.email, id: userExist._id,roal:userExist.isAdmin },
      process.env.SECRET_KEY as string
    );
    res.cookie("Bearer", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      secure: true,
    });
    res.status(200).json({
      message: "User Logged in successfully.",
      data:{ user:userExist,


        token: token,
      },
     error:null,
      status: 200,
    });
  } catch (err) {
    next(err);
  }
};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    next(err);
  }
};
export { register, login, updateUser };
