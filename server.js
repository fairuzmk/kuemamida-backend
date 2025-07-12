import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import customOrderRouter from "./routes/customOrderRoute.js";
import userRouter from "./routes/userRoute.js";
import optionRouter from "./routes/optionRoutes.js";



//APP Configuration
const app = express();
const port = 4000

//Middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

// DB connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/api/custom-order", customOrderRouter);
app.use("/api/user", userRouter);
app.use('/api/options', optionRouter);


app.get("/", (req, res)=>{
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})

// 