import express from 'express';
import multer from 'multer';
import {
  saveOptions,
  getAllOptions,
  updateOptions,
  deleteOption,
  getOptionByType,
} from '../controllers/optionController.js';

const router = express.Router();
const upload = multer(); // memory storage (tanpa file)

// Tambahkan `upload.none()` di route POST dan PUT yang pakai FormData
router.post('/', upload.none(), saveOptions);
router.get('/', getAllOptions);
router.put('/:id', upload.none(), updateOptions);
router.delete("/:id", deleteOption);
router.get('/type/:name', getOptionByType);

export default router;
