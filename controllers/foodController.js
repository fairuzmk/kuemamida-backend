import foodModel from "../models/foodModel.js";
import fs from 'fs';


// Add Food Item

const addFood = async(req,res) => {

    // let image_filename = `${req.file.filename}`;
    const image_url = req.file?.path || "";

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_url,
        category: req.body.category,
        stock: req.body.stock,
        rating: req.body.rating,
        inStock: req.body.inStock
    })

    try {
        await food.save();
        res.json({success: true, message:"Produk telah ditambahkan"})
    } catch(error){
        console.log(error)
        res.json({success:false, message: "Error"})
    }


 }

 
// Edit Food Item
const editFood = async (req, res) => {
    try {
      const { id, name, description, price, category, stock, inStock } = req.body;
  
      const updatedData = {
        name,
        description,
        price,
        category,
        stock,
        inStock,
      };
  
      // Jika ada file baru dikirim, update image
      if (req.file) {
        const image_url = req.file.path;
        // const oldFood = await foodModel.findById(id);
        // if (oldFood.image) {
        //   fs.unlink(oldFood.image, () => {}); // hapus gambar lama
        // }
        updatedData.image = image_url;
      }
  
      await foodModel.findByIdAndUpdate(id, updatedData);
      res.json({ success: true, message: "Produk berhasil diperbarui" });
  
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Terjadi kesalahan saat update" });
    }
  };

// All Food List
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data: foods})
    } catch(error){
        console.log(error);
        res.json({success: false, message: "Error"});
    }
    
}



// Remove Food Item

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Produk telah dihapus"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

 export {addFood, listFood, removeFood, editFood}