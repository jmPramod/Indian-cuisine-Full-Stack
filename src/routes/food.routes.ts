import express from "express";

import { verifyAdmin } from "../middlewears/verify.token.middlewear";
import { createCommonFood, filterProduct, getAllCommonFood, getDistinctFilters, getProductById } from "../controllers/food.controller";




export const foodRoute = express.Router();

foodRoute.get("/get-common-food",getAllCommonFood );
foodRoute.get("/get-single-food/:id",getProductById );

foodRoute.get("/filter-product",filterProduct );
foodRoute.get("/get-category",getDistinctFilters );
foodRoute.post("/create-common-food",verifyAdmin, createCommonFood);

