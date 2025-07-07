import customOrderModel from "../models/customOrderModel.js";
import fs from "fs";

// Add Custom Order
const addCustomOrder = async (req, res) => {

  let image_filename = `${req.file.filename}`;

  const order = new customOrderModel({
    customerName: req.body.customerName,
    phone: req.body.phone,
    description: req.body.description,
    basePrice: req.body.basePrice,
    totalPrice: req.body.totalPrice,
    cakeSize: req.body.cakeSize,
    cakeShape: req.body.cakeShape,
    cakeFlavor: req.body.cakeFlavor,
    krimFlavor: req.body.krimFlavor,
    filling: req.body.filling,
    themeColor: req.body.themeColor,
    writingOnCake: req.body.writingOnCake,
    topper: req.body.topper,
    topperPrice: req.body.topperPrice,
    addOn: req.body.addOn,
    addOnPrice: req.body.addOnPrice,
    additionalImages: image_filename,
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
      cakeSize,
      cakeShape,
      cakeFlavor,
      krimFlavor,
      filling,
      themeColor,
      writingOnCake,
      topper,
      topperPrice,
      addOn,
      addOnPrice,
      pickupDate,
      status,
    } = req.body;

    const updatedData = {
      customerName,
      phone,
      description,
      basePrice,
      totalPrice,
      cakeSize,
      cakeShape,
      cakeFlavor,
      krimFlavor,
      filling,
      themeColor,
      writingOnCake,
      topper,
      topperPrice,
      addOn,
      addOnPrice,
      pickupDate,
      status,
    };

    // Jika upload file baru, hapus gambar lama
    if (req.files && req.files.length > 0) {
      const oldOrder = await customOrderModel.findById(id);
      oldOrder.additionalImages.forEach(img => {
        fs.unlink(`uploads/custom/${img}`, () => {});
      });

      updatedData.additionalImages = req.files.map(file => file.filename);
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
    if (order.additionalImages) {
      order.additionalImages.forEach(img => {
        fs.unlink(`uploads/${img}`, () => {});
      });
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
