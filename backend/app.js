import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { dbConnection } from './database/dbConnection.js'; 
import { errorMiddleware } from './middlewares/error.js';
import userRouter from './routes/userRouter.js';    
import blogRouter from "./routes/blogRouter.js";
import fileUpload from "express-fileupload";


const app = express();
dotenv.config({ path: './config/config.env' });// yha config.env file ka path hai jha pr env ko store kiya h
// app.use(cors());//middleware for enabling CORS
app.use(cors({
    origin: [process.env.FRONTEND_URL], // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    credentials: true // Allow credentials
}));

app.use(cookieParser());//middleware for parsing cookies
app.use(express.json());//middleware for parsing JSON bodies
app.use(express.urlencoded({ extended: true }));//middleware for parsing URL-encoded bodies
    
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use('/api/v1/user', userRouter); // User routes
app.use('/api/v1/blog', blogRouter); // Blog routes (if you have a blogRouter)  
// app.use('/api/v1/comments', commentRouter); // Comment routes (if you have a commentRouter)


dbConnection(); // Establish database connection
app.get("/", (req, res) => {
  res.send("Blog Platform backend is live 🚀");
});

app.use(errorMiddleware); // Use error handling middleware

export default app;
