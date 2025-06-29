import mongoose from "mongoose";


export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://kuemamida:Bluefire04@cluster0.rdtssga.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("Database Connected"));

}