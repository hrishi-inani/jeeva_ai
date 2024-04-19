import dotenv from "dotenv";
dotenv.config({path:"config/.env"});

import express from "express";
const app = express();

import cors from 'cors';
const corsOptions = { 
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    credentials: true
  };
app.use(cors(corsOptions));

app.use(express.json());

//mongoose connection
import connectDatabase from "./config/database.js"
connectDatabase();

import UserRouter from "./Routes/user.js";
app.use('/user',UserRouter);

app.listen(5000, () => {
        console.log("Server listening on PORT 5000");
})