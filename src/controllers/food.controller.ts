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
    const totalItems = await FoodSchema.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);
    const info = { page, totalPages, totalItems };
    res.json({
      data: {data:foodmenu,info},
      status: 200,
      message: "Food Fetched Successfully.",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};



const filterProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { region, state, course, flavor_profile, diet, ingredients } = req.query;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const filter: { [key: string]: any } = {}; // Type for the filter object

    // Construct the filter object based on query parameters
    if (region) filter.region = { $regex: new RegExp(region as string, "i") };
    if (state) filter.state = { $regex: new RegExp(state as string, "i") };
    if (course) filter.course = { $regex: new RegExp(course as string, "i") };
    if (flavor_profile) filter.flavor_profile = { $regex: new RegExp(flavor_profile as string, "i") };
    if (diet) filter.diet = { $regex: new RegExp(diet as string, "i") };

    // Ingredient filter logic
    if (ingredients && typeof ingredients === 'string') {
      // Split the ingredients query into an array of individual ingredients
      const ingredientList: string[] = ingredients.split(',').map((ingredient) => ingredient.trim());
      // The $all operator ensures the recipe includes all the ingredients
      filter.ingredients = { $all: ingredientList.map((ingredient) => new RegExp(ingredient, "i")) };
    }

    // Fetch filtered food data from the database
    const foodmenu = await FoodSchema.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    if (!foodmenu.length) {
      return next(createError(404, "No matching food recipes found."));
    }

    const totalItems = await FoodSchema.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    const info = { page, totalPages, totalItems };
    res.json({
      data: { data: foodmenu, info },
      status: 200,
      message: "Food filtered successfully.",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};
const searchProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { text } = req.query;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
  // Fetch filtered food data from the database
  if(!text){
    return next(createError(404, "No matching food recipes found."));
   
  }
  const filter ={
    $or: [
      { name: { $regex: text, $options: "i" } }, // Case-insensitive search in 'name'
      { ingredients: { $elemMatch: { $regex: text, $options: "i" } } }, // Search in 'ingredients' array
      { state: { $regex: text, $options: "i" } }, // Search in 'state'
      { region: { $regex: text, $options: "i" } } // Search in 'region'
    ]
  }
  const foodmenu = await FoodSchema.find(filter).skip((page - 1) * limit)
  .limit(limit);
;

    if (!foodmenu.length) {
      return next(createError(404, "No matching food recipes found."));
    }

    const totalItems = await FoodSchema.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    const info = { page, totalPages, totalItems };
    res.json({
      data: { data: foodmenu, info },
      status: 200,
      message: "Food Searched successfully.",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};


const getDistinctFilters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const distinctFields = ["region", "state", "course", "flavor_profile", "diet"];
    const filterOptions: any = {};

    // Fetch distinct values for predefined fields
    for (const field of distinctFields) {
      filterOptions[field] = await FoodSchema.distinct(field);
    }

    // Fetch all ingredients and extract unique values
    const allIngredients = await FoodSchema.distinct("ingredients");
    const uniqueIngredients = new Set<string>();

    allIngredients.forEach((ingredientList: string) => {
      ingredientList.split(",").forEach((ingredient) => {
        // Normalize the ingredient name
        let normalized = ingredient.trim().toLowerCase();
        normalized = normalized.replace(/\s+/g, " "); // Remove extra spaces
        normalized = normalized.replace(/[^a-zA-Z0-9\s]/g, ""); // Remove special characters

        uniqueIngredients.add(normalized);
      });
    });

    filterOptions.ingredients = Array.from(uniqueIngredients);

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

export { searchProduct,createCommonFood, getAllCommonFood ,filterProduct,getDistinctFilters,getProductById};
