import sql from "../configs/db.js";
import OpenAI from "openai";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import FormData from "form-data";

// ------------------ OpenAI Setup ------------------
const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// ------------------ Utility: Check Usage ------------------
const checkUsage = (Plan, free_usage, res) => {
  if (Plan !== "premium" && free_usage >= 10) {
    res.status(403).json({
      success: false,
      message: "Usage limit reached. Upgrade to premium to continue.",
    });
    return true;
  }
  return false;
};

// ------------------ Generate Article ------------------
export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const Plan = req.plan;
    const free_usage = req.free_usage;

    if (checkUsage(Plan, free_usage, res)) return;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: length || 500,
    });

    const content = response.choices[0]?.message?.content || "No content generated.";

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    if (Plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.error("Error in generateArticle:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------ Generate Image ------------------
export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const { Plan, free_usage } = req;

    if (checkUsage(Plan, free_usage, res)) return;

    const formData = new FormData()
    formData.append('prompt', prompt)

 

const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1",formData,
      {
        headers: {  "x-api-key": process.env.CLIPDROP_API_KEY ,},
        responseType: "arraybuffer",
      }
    )



    const base64Image = `data:image/png;base64,${Buffer.from(data, "binary").toString("base64")}`;
    const {secure_url} = await cloudinary.uploader.upload(base64Image);

    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;

    res.json({ success: true, content:secure_url });
  } catch (error) {
    console.error("Error in generateImage:", error);
    res.json({ success: false, message: error.message });
  }
};

// ------------------ Remove Background ------------------
export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const  image  = req.file;
    const  Plan = req.plan;

    if (!file) return res.status(400).json({ success: false, message: "No file uploaded." });
    if (checkUsage(Plan, free_usage, res)) return;

    const {secure_url} = await cloudinary.uploader.upload(image.path, {
      transformation: [{ effect: "background_removal" }],
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Removed background from image', ${secure_url}, 'image')
    `;

    res.json({ success: true, content:secure_url });
  } catch (error) {
    console.error("Error in removeImageBackground:", error);
    res.json({ success: false, message: error.message });
  }
};

// ------------------ Remove Object ------------------
export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const  image  = req.file;
    const { Plan, free_usage } = req;

    if (!file || !object)
      return res.status(400).json({ success: false, message: "Missing file or object." });
    if (checkUsage(Plan, free_usage, res)) return;

    const {public_id} = await cloudinary.uploader.upload(image.path);
    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')
    `;

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.error("Error in removeImageObject:", error);
    res.json({ success: false, message: error.message });
  }
};

// ------------------ Generate Video ------------------
export const generateVideo = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { prompt, publish } = req.body;
    const { Plan, free_usage } = req;

    if (checkUsage(Plan, free_usage, res)) return;

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-video/v1",
      formData,
      {
        headers: { ...formData.getHeaders(), "x-api-key": process.env.CLIPDROP_API_KEY },
        responseType: "arraybuffer",
      }
    );

    const base64Video = `data:video/mp4;base64,${Buffer.from(data, "binary").toString("base64")}`;
    const uploadResponse = await cloudinary.uploader.upload(base64Video, { resource_type: "video" });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${uploadResponse.secure_url}, 'video', ${publish ?? false})
    `;

    res.json({ success: true, content: uploadResponse.secure_url });
  } catch (error) {
    console.error("Error in generateVideo:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
