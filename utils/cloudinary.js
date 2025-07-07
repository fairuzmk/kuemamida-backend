// utils/cloudinary.js
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'kuemamida', // Folder di Cloudinary
    allowed_formats: ['jpg', 'png', 'webp'],
    transformation: [{ width: 800, crop: 'scale' }]
  }
});

const customStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'custom order', // Folder di Cloudinary
    allowed_formats: ['jpg', 'png', 'webp'],
    transformation: [{ width: 800, crop: 'scale' }]
  }
});

export const cloudinaryUpload = storage;
export const customOrderUpload = customStorage;

export const cloudinaryInstance = cloudinary.v2;
