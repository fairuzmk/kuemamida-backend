import foodModel from "../models/foodModel.js";
import fs from 'fs';


// Add Food Item

const addFood = async(req,res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category,
        stock: req.body.stock,
        rating: req.body.rating,
        inStock: req.body.inStock
    })

    try {
        await food.save();
        res.json({success: true, message:"Data telah ditambahkan"})
    } catch(error){
        console.log(error)
        res.json({success:false, message: "Error"})
    }


 }

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
        res.json({success: true, message: "Data telah dihapus"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

 export {addFood, listFood, removeFood}