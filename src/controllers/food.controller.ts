import FoodSchema from "./../models/food.schema";
import express, { NextFunction, Request, Response } from "express";
import Auth from "../models/auth.schema";

import createError from "../middlewears/error.middlewear";
import {
  FoodSchemaValidation,
} from "../validations/validations";
import { envFiles } from "../helper/helper";
// envFiles();
import dotenv from "dotenv";
import { cloudinaryImage } from "../middlewears/cloudinar.multer";
dotenv.config();
interface ExistingImages {
  img: string;
  imgPublicId: string;
}
const createCommonFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

   

    let existingImages: ExistingImages = { img: '', imgPublicId: '' };
    // Check if req.files is an array and has elements
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const urlPath = req.files[0].path; // No need to cast after type check
      const q = urlPath.split('.')[2].split('/');
      const publicID = q[q.length - 2].concat('/', q[q.length - 1]);

      existingImages = {
        img: urlPath,
        imgPublicId: publicID,
      };
      // console.log('existingImages', existingImages);

      // if (oldData.imgPublicId) {
      //   console.log('oldData.images.imgPublicId', oldData.imgPublicId);

      //   // Use async/await instead of callback for cleaner code
      //   try {
      //     const result = await cloudinaryImage.uploader.destroy(oldData.imgPublicId);
      //     console.log('Deleted thumbnail image:', result);
      //   } catch (error) {
      //     console.error('Error deleting thumbnail image:', error);
      //   }
      // }

      req.body.imgPublicId = publicID;
      
      req.body.img = urlPath;
    }

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

    const filter: { [key: string]: any } = {};

    if (region) filter.region = { $regex: new RegExp(region as string, "i") };
    if (state) filter.state = { $regex: new RegExp(state as string, "i") };
    if (course) filter.course = { $regex: new RegExp(course as string, "i") };
    if (flavor_profile) filter.flavor_profile = { $regex: new RegExp(flavor_profile as string, "i") };
    if (diet) filter.diet = { $regex: new RegExp(diet as string, "i") };

    if (ingredients && typeof ingredients === 'string') {
      const ingredientList: string[] = ingredients.split(',').map((ingredient) => ingredient.trim());
  
      filter.ingredients = { $all: ingredientList.map((ingredient) => new RegExp(ingredient, "i")) };
    }

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

  if(!text){
    return next(createError(404, "No matching food recipes found."));
   
  }
  const filter ={
    $or: [
      { name: { $regex: text, $options: "i" } },
      { ingredients: { $elemMatch: { $regex: text, $options: "i" } } },  { state: { $regex: text, $options: "i" } }, 
      { region: { $regex: text, $options: "i" } } 
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

    for (const field of distinctFields) {
      filterOptions[field] = await FoodSchema.distinct(field);
    }
    const allIngredients = await FoodSchema.distinct("ingredients");
    const uniqueIngredients = new Set<string>();

    allIngredients.forEach((ingredientList: string) => {
      ingredientList.split(",").forEach((ingredient) => {
        let normalized = ingredient.trim().toLowerCase();
        normalized = normalized.replace(/\s+/g, " "); 
        normalized = normalized.replace(/[^a-zA-Z0-9\s]/g, ""); 

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
