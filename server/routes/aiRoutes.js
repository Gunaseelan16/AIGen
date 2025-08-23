import express from "express";
import { generateArticle, generateImage, generateVideo, removeImageBackground, removeImageObject } from "../controllers/aiControlles.js";
import {auth} from "../middlewares/auth.js"
import { upload } from "../configs/multer.js";
const aiRouter = express.Router();

// Routes
aiRouter.post("/generate-article",auth, generateArticle);

aiRouter.post("/generate-image",auth, generateImage);
aiRouter.post("/generate-video",auth, generateVideo);
aiRouter.post("/remove-image-background",upload.single('image'),auth,removeImageBackground);
aiRouter.post("/remove-image-object",upload.single('image'),auth,removeImageObject);


export default aiRouter;
