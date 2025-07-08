import customOrderModel from "../models/customOrderModel.js";
import { cloudinaryInstance } from '../utils/cloudinary.js';

// Add Custom Order
const addCustomOrder = async (req, res) => {

  const image_data = req.file
  ? {
      url: req.file.path,
      public_id: req.file.filename, // ← ini yang dibutuhkan untuk hapus!
    }
  : null;

  const order = new customOrderModel({
    customerName: req.body.customerName,
    phone: req.body.phone,
    description: req.body.description,
    basePrice: req.body.basePrice,
    totalPrice: req.body.totalPrice,
    totalAddOn: req.body.totalAddOn,
    cakeSize: req.body.cakeSize,
    cakeShape: req.body.cakeShape,
    cakeFlavor: req.body.cakeFlavor,
    krimFlavor: req.body.krimFlavor,
    filling: req.body.filling,
    themeColor: req.body.themeColor,
    writingOnCake: req.body.writingOnCake,
    topper: req.body.topper,
    topperPrice: req.body.topperPrice,
    addOns: JSON.parse(req.body.addOns),
    additionalImages: image_data,
    pickupDate: req.body.pickupDate,
  });

  try {
    await order.save();
    res.json({ success: true, message: "Pesanan custom berhasil ditambahkan" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Terjadi kesalahan saat menyimpan pesanan" });
  }
};

// List All Custom Orders
const listCustomOrders = async (req, res) => {
  try {
    const orders = await customOrderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Gagal mengambil data pesanan" });
  }
};

// Edit Custom Order



const editCustomOrder = async (req, res) => {
  try {
    const {
      id,
      customerName,
      phone,
      description,
      basePrice,
      totalPrice,
      totalAddOn,
      cakeSize,
      cakeShape,
      cakeFlavor,
      krimFlavor,
      filling,
      themeColor,
      writingOnCake,
      topper,
      topperPrice,
      
      pickupDate,
      status,
    } = req.body;

    let addOns = [];
    if (req.body.addOns) {
      try {
        addOns = JSON.parse(req.body.addOns);
      } catch (err) {
        console.error("Gagal parse addOns:", err);
      }
    }

    const updatedData = {
      customerName,
      phone,
      description,
      basePrice,
      totalPrice,
      totalAddOn,
      cakeSize,
      cakeShape,
      cakeFlavor,
      krimFlavor,
      filling,
      themeColor,
      writingOnCake,
      topper,
      topperPrice,
      addOns,
      pickupDate,
      status,
    };

    // Jika upload file baru, hapus gambar lama
    if (req.file) {
      const image_url = req.file.path;
      // const oldOrder = await customOrderModel.findById(id);
      // oldOrder.additionalImages.forEach(img => {
      //   fs.unlink(`uploads/custom/${img}`, () => {});
      // });

      updatedData.additionalImages = image_url;
    }

    await customOrderModel.findByIdAndUpdate(id, updatedData);
    res.json({ success: true, message: "Pesanan berhasil diperbarui" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Gagal memperbarui pesanan" });
  }
};

// Remove Custom Order
const removeCustomOrder = async (req, res) => {
  try {
    const order = await customOrderModel.findById(req.body.id);

    if (order?.additionalImages?.public_id) {
      await cloudinaryInstance.uploader.destroy(order.additionalImages.public_id);
    }

    await customOrderModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Pesanan telah dihapus" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Gagal menghapus pesanan" });
  }
};

export {
  addCustomOrder,
  listCustomOrders,
  editCustomOrder,
  removeCustomOrder
};
