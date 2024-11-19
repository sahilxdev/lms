import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/dbConnect.js";

dotenv.config({});

// calling database connection here
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
    
});
