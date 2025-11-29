import { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { getAssetPath } from "../utils/paths";

interface StoryPage {
  imageUrl: string;
  text: string;
  pageNumber: number;
}

interface StoryPageConfig {
  pageNumber: number;
  imageDescription: string;
  imageName: string;
  text: string;
}

// Story pages configuration
const STORY_PAGES: StoryPageConfig[] = [
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
];

const Test = () => {
  const [boyImage, setBoyImage] = useState<File | null>(null);
  const [boyName, setBoyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [storyPages, setStoryPages] = useState<StoryPage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [, setCurrentPage] = useState(0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBoyImage(e.target.files[0]);
    }
  };

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Helper function to generate an image using Gemini API
  const generateImage = async (
    apiKey: string,
    originalImageBase64: string,
    coverImageBase64: string | null,
    prompt: string,
    mimeType: string
  ): Promise<string | null> => {
    try {
      const parts: any[] = [
        {
          inlineData: {
            data: originalImageBase64,
            mimeType: mimeType,
          },
        },
      ];

      // Add cover image as reference if available
      if (coverImageBase64) {
        parts.push({
          inlineData: {
            data: coverImageBase64,
            mimeType: "image/png",
          },
        });
      }

      parts.push({ text: prompt });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: parts,
              },
            ],
            generationConfig: {
              responseModalities: ["IMAGE"],
              imageConfig: {
                aspectRatio: "9:16",
              },
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to generate image");
      }

      const data = await response.json();

      // Extract image from response
      if (data.candidates && data.candidates[0]?.content?.parts) {
        for (const part of data.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
            // Convert base64 to data URL
            return `data:${part.inlineData.mimeType || "image/png"};base64,${
              part.inlineData.data
            }`;
          }
        }
      }

      return null;
    } catch (error) {
      console.error("Error generating image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!boyImage || !boyName.trim()) {
      setError("Please upload an image and enter a name");
      return;
    }

    setIsLoading(true);
    setError(null);
    setStoryPages([]);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error(
          "GEMINI_API_KEY not found. Please set VITE_GEMINI_API_KEY in your .env file."
        );
      }

      // Convert uploaded image to base64
      const imageBase64 = await fileToBase64(boyImage);
      const base64Data = imageBase64.split(",")[1]; // Remove data:image/...;base64, prefix

      // Step 1: Generate cover image first (cartoon reference of the boy)
      const coverPrompt = `Create a whimsical digital painting in a modern children's book style, featuring soft textures and magical glowing effects. 
        Transform the person in this photo into a cartoon character that will serve as a reference for consistency. 
        The character should be a young boy named ${boyName.trim()}, shown in a full-body or three-quarter view, 
        standing in a simple, neutral background. Make sure the facial features, hair color, and overall appearance 
        match the person in the photo, but in a charming cartoon style. This image will be used as a reference 
        to maintain consistency across all story pages.`;

      console.log("Generating cover image...");
      const coverImageDataUrl = await generateImage(
        apiKey,
        base64Data,
        null,
        coverPrompt,
        boyImage.type || "image/jpeg"
      );

      if (!coverImageDataUrl) {
        throw new Error("Failed to generate cover image");
      }

      const coverImageBase64 = coverImageDataUrl.split(",")[1]; // Extract base64 from data URL

      // Step 2: Generate images for each story page using both original and cover as references
      console.log("Generating story pages...");
      const generatedPages = await Promise.all(
        STORY_PAGES.map(async (page) => {
          try {
            // Create prompt for Gemini to create the scene with consistent character
            const prompt = `Using the original photo and the cover reference image, create a scene matching this description: ${
              page.imageDescription
            }.
              The character in the scene must match the boy from both the original photo and the cover reference image exactly.
              Maintain consistency in facial features, hair, and overall appearance.
              The boy's name is ${boyName.trim()}.
              Style: A whimsical digital painting in a modern children's book style, featuring soft textures and magical glowing effects.`;

            const imageDataUrl = await generateImage(
              apiKey,
              base64Data,
              coverImageBase64,
              prompt,
              boyImage.type || "image/jpeg"
            );

            // If no image data, use placeholder
            if (!imageDataUrl) {
              console.warn(
                `No image data in response for page ${page.pageNumber}`
              );
              return {
                pageNumber: page.pageNumber,
                imageUrl: getAssetPath(`stories/${page.imageName}`),
                text: page.text.replace(/{NAME}/g, boyName.trim()),
              };
            }

            return {
              pageNumber: page.pageNumber,
              imageUrl: imageDataUrl,
              text: page.text.replace(/{NAME}/g, boyName.trim()),
            };
          } catch (error) {
            console.error(`Error generating page ${page.pageNumber}:`, error);
            // Fallback to placeholder
            return {
              pageNumber: page.pageNumber,
              imageUrl: getAssetPath(`stories/${page.imageName}`),
              text: page.text.replace(/{NAME}/g, boyName.trim()),
            };
          }
        })
      );

      setStoryPages(generatedPages);
    } catch (err: any) {
      setError(err.message || "Failed to generate story. Please try again.");
      console.error("Error generating story:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Only use generated pages (no fallback to sample pages)
  const displayPages = storyPages;

  if (storyPages.length > 0) {
    return (
      <div className="flipbook-page-container">
        <HTMLFlipBook
          width={550}
          height={733}
          maxShadowOpacity={0.5}
          drawShadow={true}
          showCover={true}
          size="fixed"
          onFlip={(e) => setCurrentPage(e.data)}
        >
          <div className="page" style={{ background: "transparent" }}>
            <div className="page-content cover">
              <h2>{boyName || "Story"}</h2>
            </div>
          </div>

          {displayPages.map((story) => (
            <div className="page" key={story.pageNumber}>
              <div className="page-content">
                <h2 className="page-header">Page {story.pageNumber}</h2>
                <div className="page-image">
                  <img
                    src={story.imageUrl}
                    alt={`Page ${story.pageNumber}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EImage Placeholder%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div className="page-text">{story.text}</div>
                <div className="page-footer">{story.pageNumber + 1}</div>
              </div>
            </div>
          ))}

          <div className="page" style={{ background: "transparent" }}>
            <div className="page-content cover">
              <h2>THE END</h2>
            </div>
          </div>
        </HTMLFlipBook>
      </div>
    );
  }

  return (
    <div className="section-container py-12">
      <h1 className="heading-2 text-center mb-8">Story Generator Test</h1>

      {!isLoading && (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
          <div className="card space-y-6">
            <div>
              <label
                htmlFor="boy-image"
                className="block text-sm font-medium text-dark-600 mb-2"
              >
                Upload Boy's Photo
              </label>
              <input
                type="file"
                id="boy-image"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-dark-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-600 file:text-white hover:file:bg-primary-700"
                required
              />
              {boyImage && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(boyImage)}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="boy-name"
                className="block text-sm font-medium text-dark-600 mb-2"
              >
                Boy's Name
              </label>
              <input
                type="text"
                id="boy-name"
                value={boyName}
                onChange={(e) => setBoyName(e.target.value)}
                placeholder="Enter the boy's name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? "Generating Story..." : "Generate Story"}
            </button>
          </div>
        </form>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mb-4"></div>
          <p className="text-dark-600 text-lg">
            Generating your personalized story...
          </p>
          <p className="text-dark-400 text-sm mt-2">
            This may take a few moments
          </p>
        </div>
      )}
    </div>
  );
};

export default Test;
