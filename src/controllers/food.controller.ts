import FoodSchema from "./../models/food.schema";
import express, { NextFunction, Request, Response } from "express";


import createError from "../middlewears/error.middlewear";
import {
  FoodSchemaValidation,
} from "../validations/validations";
import { envFiles } from "../helper/helper";
// envFiles();
import dotenv from "dotenv";
dotenv.config();
const createCommonFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = FoodSchemaValidation.validate(req.body);

    if (error) {
      return next(createError(401, error.details[0].message));
    }

    const newBank = new FoodSchema(value);
    let savedFood = await newBank.save();
    res.json({
      data: savedFood,
      status: 200,
      message: "Food Created Successfully.",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};
const getAllCommonFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const foodmenu = await FoodSchema.find()
      .skip((page - 1) * limit)
      .limit(limit);

    if (!foodmenu) {
      return next(createError(401, "No Food Recipe Avlaible"));
    }
    res.json({
      data: foodmenu,
      status: 200,
      message: "Food Fetched Successfully.",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};
const filterProduct=async (req: Request, res: Response, next: NextFunction) => {
  try {
        const { region, state, course, flavor_profile, diet } = req.query;
        const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const filter: any = {};

   
    if (region) filter.region = { $regex: new RegExp(region as string, "i") };
    if (state) filter.state = { $regex: new RegExp(state as string, "i") };
    if (course) filter.course = { $regex: new RegExp(course as string, "i") };
    if (flavor_profile) filter.flavor_profile = { $regex: new RegExp(flavor_profile as string, "i") };
    if (diet) filter.diet = { $regex: new RegExp(diet as string, "i") };


    // Fetch filtered food data
    const foodmenu = await FoodSchema.find(filter).skip((page - 1) * limit)
    .limit(limit);

    if (!foodmenu.length) {
      return next(createError(404, "No matching food recipes found."));
    }

    res.json({
      data: foodmenu,
      status: 200,
      message: "Food filtered successfully.",
      error: null,
    });
  } catch (error) {
    next(error)
  }
}
const getDistinctFilters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const distinctFields = ["region", "state", "course", "flavor_profile", "diet"];
    const filterOptions: any = {};

    for (const field of distinctFields) {
      filterOptions[field] = await FoodSchema.distinct(field);
    }

    res.json({
      data: filterOptions,
      status: 200,
      message: "Distinct filter values fetched successfully.",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Validate if ID is a valid MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return next(createError(400, "Invalid product ID format."));
    }

    const foodItem = await FoodSchema.findById(id);

    if (!foodItem) {
      return next(createError(404, "Food item not found."));
    }

    res.json({
      data: foodItem,
      status: 200,
      message: "Food item retrieved successfully.",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export { createCommonFood, getAllCommonFood ,filterProduct,getDistinctFilters,getProductById};
