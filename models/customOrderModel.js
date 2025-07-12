import mongoose from "mongoose";


const customOrderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String }, // penjelasan tambahan dari pelanggan
    basePrice: { type: Number, required: true },
    totalPrice: { type: Number }, // termasuk add-on
  
    cakeSize: { type: String, required: true },
    cakeShape: { type: String},

    cakeFlavor: { type: String, required: true },
    krimFlavor: {type: String},
    filling: { type: String },
    themeColor: { type: String },
    writingOnCake: { type: String },
    topper: {
      type: String, // nama topper
    },
    topperPrice: { type: Number, default: 0 },
    addOns: [
      {
        addOn: { type: String},
        addOnPrice: { type: Number},
      },
    ],
    totalAddOn: {type: Number},
    additionalImages: {
      url: String,
      public_id: String,
    },
    pickupDate: { type: Date},
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'In-progress', 'Ready', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  
    createdAt: { type: Date, default: Date.now },

})

const customOrderModel = mongoose.models.customorder || mongoose.model("customorder", customOrderSchema)

export default customOrderModel;
