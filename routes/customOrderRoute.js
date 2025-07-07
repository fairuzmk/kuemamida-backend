import express from "express";
import {
  addCustomOrder,
  listCustomOrders,
  removeCustomOrder,
  editCustomOrder
} from "../controllers/customOrderController.js";

import multer from "multer";
import { customOrderUpload } from "../utils/cloudinary.js";


const customOrderRouter = express.Router();

// // Image Storage Engine for Custom Orders
// const storage = multer.diskStorage({
//   destination: "uploads/custom",
//   filename: (req, file, cb) => {
//     return cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage: storage });

const upload = multer({ storage: customOrderUpload });

// --- Routes ---


customOrderRouter.post("/add", upload.single("additionalImages"), addCustomOrder);


customOrderRouter.post("/edit", upload.single("additionalImages"), editCustomOrder);

// List All Custom Orders
customOrderRouter.get("/list", listCustomOrders);

// Remove a Custom Order
customOrderRouter.post("/remove", removeCustomOrder);

export default customOrderRouter;