import dotenv from "dotenv";
dotenv.config();
import multer from "multer";  // Use default import
import { v2 as cloudinary } from 'cloudinary';
// import { envFiles } from "../helper/helper";
// export const envFiles=()=>{

// }
// Cloudinary configuration - make sure to add your environment variables

console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
export const cloudinaryImage=cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECREAT,
});

interface CloudinaryStorageOptions {
  cloudinary: typeof cloudinary;
  params?: {
    folder?: string;
    allowedFormats?: string[];
    transformation?: any[];
  };
}

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
        { width: 600, height: 600, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
        { progressive: true },
        { strip: true }
      ]
    }
  });
  
export const uploadProfile = multer({ storage: ProfileStorage });
export const foodProfile = multer({ storage: FoodStorage });
