import express from "express";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Sample story pages with image descriptions
// These descriptions will be used to generate images with Gemini
const STORY_PAGES = [
  {
    pageNumber: 1,
    imageDescription:
      "A cartoon illustration of a young boy standing in a magical forest, looking curious and brave. The style should be colorful and child-friendly.",
    imageName: "page1.png",
    text: "Once upon a time, there was a brave boy named {NAME}.",
  },
  {
    pageNumber: 2,
    imageDescription:
      "A cartoon illustration of the same boy exploring a magical forest with tall trees and colorful flowers. The boy looks happy and adventurous.",
    imageName: "page2.png",
    text: "{NAME} loved to explore the magical forest.",
  },
  {
    pageNumber: 3,
    imageDescription:
      "A cartoon illustration of the boy discovering a hidden treasure chest in the forest. The boy looks excited and amazed.",
    imageName: "page3.png",
    text: "One day, {NAME} discovered a hidden treasure.",
  },
  {
    pageNumber: 4,
    imageDescription:
      "A cartoon illustration of the boy sharing the treasure with his friends. Multiple children are shown celebrating together.",
    imageName: "page4.png",
    text: "{NAME} shared the treasure with all his friends.",
  },
  {
    pageNumber: 5,
    imageDescription:
      "A cartoon illustration of the boy and his friends playing together happily in the forest. The scene is joyful and peaceful.",
    imageName: "page5.png",
    text: "And they all lived happily ever after!",
  },
];

// POST /api/test/generate-story
router.post("/generate-story", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Get the model - MUST use gemini-2.5-flash-image for image generation
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash-image",
    });

    // Convert uploaded image to base64 for potential use with Gemini
    const imageBase64 = req.file.buffer.toString("base64");
    const imageMimeType = req.file.mimetype;

    // Log that we received the image (for debugging)
    console.log(
      `Received image for ${name}: ${req.file.originalname}, ${imageMimeType}, ${req.file.size} bytes`
    );

    // Generate images for each story page
    const generatedPages = await Promise.all(
      STORY_PAGES.map(async (page) => {
        try {
          // Create prompt for Gemini to replace the face in the placeholder
          const prompt = `Replace the face in this image with the face from the uploaded photo. 
            The uploaded photo shows a boy named ${name}. 
            Keep the same style and setting as described: ${page.imageDescription}.
            Make sure the face matches the boy from the uploaded photo. 
            Style: A whimsical digital painting in a modern children's book style, featuring soft textures and magical glowing effects.`;

          // For now, we'll return placeholder URLs
          // In production, you would:
          // 1. Use Gemini to generate the image with the face replacement
          // 2. Save the generated image to storage
          // 3. Return the URL

          // Note: Gemini 2.0 Flash Exp supports image generation, but we need to handle it properly
          // For this test, we'll return the image descriptions and names for manual generation

          return {
            pageNumber: page.pageNumber,
            imageUrl: `/stories/${page.imageName}`, // This will be the generated image URL
            text: page.text,
            imageDescription: page.imageDescription,
            imageName: page.imageName,
          };
        } catch (error) {
          console.error(`Error generating page ${page.pageNumber}:`, error);
          return {
            pageNumber: page.pageNumber,
            imageUrl: `/stories/${page.imageName}`,
            text: page.text,
            imageDescription: page.imageDescription,
            imageName: page.imageName,
          };
        }
      })
    );

    // Return the story pages with image descriptions for manual generation
    res.json({
      success: true,
      pages: generatedPages,
      message:
        "Story generated successfully. Please generate images using the provided descriptions and place them in the public/stories folder.",
      imageDescriptions: generatedPages.map((p) => ({
        pageNumber: p.pageNumber,
        imageName: p.imageName,
        description: p.imageDescription,
        instruction: `Generate an image with the boy's face from the uploaded photo. ${p.imageDescription} Style: A whimsical digital painting in a modern children's book style, featuring soft textures and magical glowing effects. Use 9:16 aspect ratio parameter when calling the model.`,
      })),
    });
  } catch (error: any) {
    console.error("Error generating story:", error);
    res.status(500).json({
      message: error.message || "Failed to generate story",
      error: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

export default router;
