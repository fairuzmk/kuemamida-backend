import mongoose from "mongoose";

// Schema untuk item dalam setiap opsi
const optionItemSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  price: { type: Number, default: 0 }
}, { _id: false });

// Schema utama, menyimpan semua jenis opsi secara fleksibel
const optionSchema = new mongoose.Schema({
  options: {
    type: Map,
    of: [optionItemSchema]
  }
}, { timestamps: true });

const optionModel = mongoose.models.optionmodel || mongoose.model("optionmodel", optionSchema);


export default optionModel;
