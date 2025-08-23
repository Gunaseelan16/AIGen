import express from "express";
import cors from "cors";
import 'dotenv/config'
import aiRouter from "./routes/aiRoutes.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoutes.js";


 
const app = express();

await connectCloudinary()


// Middlewares
app.use(cors());
app.use(express.json())
app.use(clerkMiddleware())

// API Routes with Authentication
app.use( requireAuth())

app.use('/api/ai/',aiRouter)
app.use('/api/user/',userRouter)



// Root Test Route
app.get("/", (req, res) => {res.send("AI API Server is running...")});
const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
});
