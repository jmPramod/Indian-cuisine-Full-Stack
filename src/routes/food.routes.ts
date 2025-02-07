import express from "express";

import { verifyAdmin } from "../middlewears/verify.token.middlewear";
import { createCommonFood, filterProduct, getAllCommonFood, getDistinctFilters, getProductById, searchProduct } from "../controllers/food.controller";
import { foodProfile } from "../middlewears/cloudinar.multer";




export const foodRoute = express.Router();

foodRoute.get("/get-common-food",getAllCommonFood );
foodRoute.get("/get-single-food/:id",getProductById );

foodRoute.get("/filter-product",filterProduct );
foodRoute.get("/get-category",getDistinctFilters );

foodRoute.get("/search-food",searchProduct );
foodRoute.post("/create-common-food",verifyAdmin,foodProfile.any(), createCommonFood);

