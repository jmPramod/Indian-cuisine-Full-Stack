import Joi from "joi";

export const RegisterSchemaValidation = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "First name is required.",
    "string.empty": "First name cannot be empty.",
  }),
  lastName: Joi.string().allow(null, "").optional(),
  phone: Joi.number().required().messages({
    "any.required": "Phone number is required.",
    "number.base": "Phone number must be a number.",
    "number.empty": "Phone number cannot be empty.",
  }),
  address: Joi.string().allow(null, "").optional(),
  state: Joi.string().allow(null, "").optional(),
  country: Joi.string().messages({
    "any.required": "Country is required.",
    "string.empty": "Country cannot be empty.",
  }),
  pinCode: Joi.number().messages({
    "any.required": "Pin code is required.",
    "number.base": "Pin code must be a number.",
    "number.empty": "Pin code cannot be empty.",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Email must be a valid email address.",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required.",
    "string.empty": "Password cannot be empty.",
  }),
  isAdmin: Joi.string().valid("admin", "user").default("user"),
  
});


export const FoodSchemaValidation = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required.",
    "string.empty": "Name cannot be empty.",
  }),
  ingredients: Joi.array().items(Joi.string().required()).required().messages({
    "any.required": "Ingredients are required.",
    "array.base": "Ingredients must be an array.",
    "array.includes": "Each ingredient must be a string.",
    "string.empty": "Ingredients cannot be empty.",
  }),
  diet: Joi.string().valid("vegetarian", "non-vegetarian").required().messages({
    "any.required": "Diet type is required.",
    "string.empty": "Diet type cannot be empty.",
    "any.only": "Diet type must be either 'vegetarian' or 'non-vegetarian'.",
  }),
  prep_time: Joi.number().min(0).required().messages({
    "any.required": "Preparation time is required.",
    "number.base": "Preparation time must be a number.",
    "number.min": "Preparation time cannot be negative.",
  }),
  cook_time: Joi.number().min(0).required().messages({
    "any.required": "Cooking time is required.",
    "number.base": "Cooking time must be a number.",
    "number.min": "Cooking time cannot be negative.",
  }),
  flavor_profile: Joi.string().required().messages({
    "any.required": "Flavor profile is required.",
    "string.empty": "Flavor profile cannot be empty.",
  }),
  course: Joi.string().required().messages({
    "any.required": "Course is required.",
    "string.empty": "Course cannot be empty.",
  }),
  state: Joi.string().required().messages({
    "any.required": "State is required.",
    "string.empty": "State cannot be empty.",
  }),
  region: Joi.string().required().messages({
    "any.required": "Region is required.",
    "string.empty": "Region cannot be empty.",
  }),
  img: Joi.string().allow("").optional(),
  imgPublicId: Joi.string().allow("").optional(),
  
  createdBy: Joi.string().allow(null).optional(),
});