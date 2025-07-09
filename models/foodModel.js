import mongoose from "mongoose";


const foodSchema = new mongoose.Schema({
    name: {type: String,required: true},
    description: {type:String},
    price: {type: Number, required: true},
    image:{type: String},
    category: {type: String},
    varians: [
      {
        varian: { type: String, required: true },
        varianPrice: { type: Number, required: true },
      },
    ],
    stock: {type: Number},
    rating: {type: Number},
    inStock: {type: Boolean}
})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema)

export default foodModel;
