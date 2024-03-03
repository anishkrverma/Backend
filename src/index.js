import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from './app.js'; 
dotenv.config({
    path: './env'
})

const ports = process.env.PORT || 3000

connectDB()
    .then(() => {
        app.listen(ports, () => {
            console.log(`Server is running on port: ${ports}`)
        })
    })
    .catch((error) => {
        console.log(`MongoDB connection Failed !!!${error}`)
    })
/*
monogoDB connection in index file
import express from "express";
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw err
    };
})();
*/