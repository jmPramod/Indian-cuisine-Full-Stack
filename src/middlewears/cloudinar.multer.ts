import multer from "multer";  // Use default import
import { v2 as cloudinary } from 'cloudinary';
// import { envFiles } from "../helper/helper";
import dotenv from "dotenv";
// export const envFiles=()=>{

    dotenv.config();
// }
// Cloudinary configuration - make sure to add your environment variables
export const cloudinaryImage=cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECREAT,
});

// Type declaration for multer-storage-cloudinary (create a .d.ts file if needed)
interface CloudinaryStorageOptions {
  cloudinary: typeof cloudinary;
  params?: {
    folder?: string;
    allowedFormats?: string[];
    transformation?: any[];
  };
}

// Using require with type assertion for CloudinaryStorage
const CloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage as {
  new (options: CloudinaryStorageOptions): multer.StorageEngine;
};

const ProfileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ProfileImage2',
    transformation: [
      { width: 800, height: 600, crop: 'limit' },
      { quality: 'auto' },
      { fetch_format: 'auto' },
      { progressive: true },
      { strip: true }
    ]
  }
});
const FoodStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'FoodImg',
      transformation: [
        { width: 800, height: 600, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
        { progressive: true },
        { strip: true }
      ]
    }
  });
  
export const uploadProfile = multer({ storage: ProfileStorage });
export const foodProfile = multer({ storage: FoodStorage });
