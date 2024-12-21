import express from "express";
import dotenv from "dotenv";
// connets frontend to backend
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import applicationRouter from "./routes/applicationRouter.js"
import userRouter from "./routes/userRouter.js"
import projectRouter from "./routes/projectRouter.js"
import { dbConnection } from "./database/dbConnection.js"; 
import { errorMiddleware} from "./middlewares/error.js"

const app=express();
//connection of env file 
dotenv.config({path:'./config/config.env'});

app.use(cors({
    origin: 'http://localhost:5173',
    methods:['GET','POST','DELETE','PUT'],
    credentials: true,
}));
app.options('*', cors()); // Preflight requests

app.use(cookieParser());
//aprse only json data neglect other
app.use(express.json());
//converts string into json foramt
app.use(express.urlencoded({extended:true}));
//u cazn use multer 
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}));

app.use("/api/v1/user",userRouter);
app.use("/api/v1/application",applicationRouter);
app.use("/api/v1/project",projectRouter);

dbConnection();

app.use(errorMiddleware);

export default app