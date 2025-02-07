import express, { NextFunction, Request, Response } from "express";

import { ValidationError } from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Auth from "../models/auth.schema";
import FoodSchema from "./../models/food.schema";
import createError from "../middlewears/error.middlewear";
import { RegisterSchemaValidation } from "../validations/validations";
import { envFiles } from "../helper/helper";
envFiles();
import dotenv from "dotenv";
import { cloudinaryImage } from "../middlewears/cloudinar.multer";
dotenv.config();
interface ExistingImages {
  imageUrl: string;
  imgPublicId: string;
}
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
      status: 200,
      message: "New User created",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const favoriteFood = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const { favoriteUserId, action } = req.body;

    // Find the user by ID
    const user: any = await Auth.findById(userId);

    if (!user) {
      return next(createError(401, "This User Doesn't Exist"));
    }

    if (action === 'add') {
      // Check if the favoriteUserId is not already in the favorites list
      if (!user.favorite.includes(favoriteUserId)) {
        user.favorite.push(favoriteUserId);
        await user.save();
      }
    } else if (action === 'remove') {
        user.favorite = user.favorite.filter((id: any) => id.toString() !== favoriteUserId.toString());
      await user.save();
    }

    res.json({
      data: user,
      status: 200,
      message: "User updated successfully",
      error: null,
    });
  } catch (error) {
    console.error("Error in favoriteFood:", error); // Log the error for debugging
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
    const oldData :any= await Auth.findById(req.params.id);

    if (!oldData) {
      return next(createError(404, 'User not found'));
    }

    let existingImages: ExistingImages = { imageUrl: '', imgPublicId: '' };
    // Check if req.files is an array and has elements
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const urlPath = req.files[0].path; // No need to cast after type check
      const q = urlPath.split('.')[2].split('/');
      const publicID = q[q.length - 2].concat('/', q[q.length - 1]);

      existingImages = {
        imageUrl: urlPath,
        imgPublicId: publicID,
      };
      console.log('existingImages', existingImages);

      if (oldData.profileImage.imgPublicId) {
        console.log('oldData.images.imgPublicId', oldData.profileImage.imgPublicId);

        // Use async/await instead of callback for cleaner code
        try {
          const result = await cloudinaryImage.uploader.destroy(oldData.profileImage.imgPublicId);
          console.log('Deleted thumbnail image:', result);
        } catch (error) {
          console.error('Error deleting thumbnail image:', error);
        }
      }

      req.body.profileImage = existingImages;
    }

    if (req.body.password) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        oldData.password
      );
      if (!isPasswordValid) {
        return next(createError(400, 'Your previous password is incorrect')); // 400 Bad Request is more appropriate
      } else {
        const saltRounds = 10;
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      }
    }

    const userToUpdate = await Auth.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      message: 'User updated successfully.',
      data: userToUpdate,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
export { register, login, updateUser ,favoriteFood};
