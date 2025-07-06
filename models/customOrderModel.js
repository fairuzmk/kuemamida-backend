import mongoose from "mongoose";


const customOrderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String }, // penjelasan tambahan dari pelanggan
    basePrice: { type: Number, required: true },
    totalPrice: { type: Number }, // termasuk add-on
  
    cakeSize: { type: String, enum: ['16', '18', '20', '22', 'custom'], required: true },
    cakeShape: { type: String, enum: ['round', 'square', 'custom'] },

    cakeFlavor: { type: String, required: true },
    krimFlavor: {type: String},
    filling: { type: String },
    themeColor: { type: String },
    writingOnCake: { type: String },
    topper: {
      type: String, // nama topper
    },
    topperPrice: { type: Number, default: 0 },
    addOn : {type: String},
    addOnPrice: {type: Number},

    additionalImages: {type: String}, // referensi dari pelanggan (URL gambar)
    
    pickupDate: { type: Date},
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'in-progress', 'ready', 'completed', 'cancelled'],
      default: 'pending',
    },
  
    createdAt: { type: Date, default: Date.now },

})

const customOrderModel = mongoose.models.customorder || mongoose.model("customorder", customOrderSchema)

export default customOrderModel;
