import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import applicationRouter from "./routes/applicationRouter.js";
import userRouter from "./routes/userRouter.js";
import projectRouter from "./routes/projectRouter.js";
import { connectDB } from "./database/dbConnection.js"; 
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

// ✅ Proper CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ["https://innovate-hub-frontend.onrender.com"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

// ✅ Apply CORS before routes
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// ✅ Define routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/project", projectRouter);

connectDB();

// ✅ Error handling middleware
app.use(errorMiddleware);

export default app;
