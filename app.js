import "express-async-errors";

import * as dotenv from 'dotenv'
dotenv.config()
import path from 'path'
const currentFilePath = new URL(import.meta.url).pathname;
const currentDirPath = path.dirname(currentFilePath);
import initializeDatabase from './DB/connect.js';

import express from 'express'
const app = express();






import cors from "cors";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";


// routes

// Middlewares     completedDeliveriesRouter
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser(process.env.JWT_COOKIE));
app.use(bodyParser.urlencoded({ extended: true }))



app.use(express.static(path.join(currentDirPath, "./public")));
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.json());




app.get("/", (req, res) => {
     res.json({ message: "Welcome to mySQL App" });

});






//ErrorHandlerMiddleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";



app.set("trust proxy", 1);
app.use(
     rateLimiter({
          windowMs: 15 * 60 * 1000,
          max: 60,
     })
);
app.use(helmet());
app.use(xss());



// Use routes


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



//port
const port = process.env.PORT || 5000;

const start = async () => {
     try {
          await initializeDatabase();
          console.log('Database initialized successfully');
          app.listen(port, () => {
               console.log(`listing on port ${port}...`);
          });
     } catch (error) {
          console.log(error);
     }
};

start();