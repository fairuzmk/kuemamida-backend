import express from "express";
import { addFood, listFood, removeFood, editFood } from "../controllers/foodController.js";
import multer from "multer";
import { cloudinaryUpload } from "../utils/cloudinary.js";

const foodRouter = express.Router();

// Image Storage Engine
// const storage = multer.diskStorage({
//     destination: "uploads",
//     filename: (req, file,cb) => {
//         return cb(null, `${Date.now()}${file.originalname}`)
//     }
// })

// const upload = multer({storage:storage})

// Ganti dari lokal ke Cloudinary

const upload = multer({ storage: cloudinaryUpload });


foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.post("/edit", upload.single("image"), editFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);





export default foodRouter;