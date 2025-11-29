#!/usr/bin/env python3
"""
Generate cartoon-style images using Gemini API directly
Uses GEMINI_API_KEY from .env file
Requires: pip install google-genai pillow python-dotenv
"""

import os
import sys
from io import BytesIO
from pathlib import Path

from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from google import genai
from google.genai import types
from PIL import Image

# Story pages with image descriptions
STORY_PAGES = [
    {
        "pageNumber": 1,
        "imageDescription": "A cartoon illustration of a young boy standing in a magical forest, looking curious and brave. The style should be colorful and child-friendly.",
        "imageName": "page1.png",
    },
    {
        "pageNumber": 2,
        "imageDescription": "A cartoon illustration of the same boy exploring a magical forest with tall trees and colorful flowers. The boy looks happy and adventurous.",
        "imageName": "page2.png",
    },
    {
        "pageNumber": 3,
        "imageDescription": "A cartoon illustration of the boy discovering a hidden treasure chest in the forest. The boy looks excited and amazed.",
        "imageName": "page3.png",
    },
    {
        "pageNumber": 4,
        "imageDescription": "A cartoon illustration of the boy sharing the treasure with his friends. Multiple children are shown celebrating together.",
        "imageName": "page4.png",
    },
    {
        "pageNumber": 5,
        "imageDescription": "A cartoon illustration of the boy and his friends playing together happily in the forest. The scene is joyful and peaceful.",
        "imageName": "page5.png",
    },
]


def generate_images():
    # Get API key from environment
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        print("Error: GEMINI_API_KEY environment variable is not set")
        print("Please set GEMINI_API_KEY in your .env file")
        print("Get your API key from: https://aistudio.google.com/app/apikey")
        sys.exit(1)

    # Initialize the client with API key
    try:
        client = genai.Client(api_key=api_key)
    except Exception as e:
        print(f"Error initializing Gemini client: {e}")
        print("Make sure you have:")
        print("1. Set GEMINI_API_KEY in your .env file")
        print("2. The API key is valid")
        sys.exit(1)

    # Output folder
    script_dir = Path(__file__).parent
    output_folder = script_dir.parent.parent / "frontend" / "public" / "stories"
    output_folder.mkdir(parents=True, exist_ok=True)

    print(f"Generating cartoon-style images using Gemini API...")
    print(f"Output folder: {output_folder}\n")

    for page in STORY_PAGES:
        try:
            print(f"Generating {page['imageName']}...")
            print(f"Description: {page['imageDescription']}\n")

            # Create prompt with specific style
            prompt = f"{page['imageDescription']}. A whimsical digital painting in a modern children's book style, featuring soft textures and magical glowing effects."

            # Generate image using Gemini 2.5 Flash Image with 9:16 aspect ratio
            response = client.models.generate_content(
                model="gemini-2.5-flash-image",
                contents=[prompt],
                config=types.GenerateContentConfig(
                    response_modalities=["IMAGE"],
                    image_config=types.ImageConfig(aspect_ratio="9:16"),
                ),
            )

            # Extract image from response
            image_saved = False
            if hasattr(response, "candidates") and response.candidates:
                candidate = response.candidates[0]
                if hasattr(candidate, "content") and hasattr(
                    candidate.content, "parts"
                ):
                    for part in candidate.content.parts:
                        if (
                            hasattr(part, "inline_data")
                            and part.inline_data is not None
                        ):
                            inline_data = part.inline_data
                            if hasattr(inline_data, "data") and inline_data.data:
                                image_data = BytesIO(inline_data.data)
                                image = Image.open(image_data)
                                image_path = output_folder / page["imageName"]
                                image.save(image_path, "PNG")
                                print(f"✅ Saved: {image_path}\n")
                                image_saved = True
                                break

            if not image_saved:
                print(f"⚠️  No image data in response for {page['imageName']}")
                print(f"Response: {response}\n")

        except Exception as e:
            print(f"❌ Error generating {page['imageName']}: {e}\n")
            # Create a note file with instructions
            note_path = output_folder / f"{page['imageName']}.note.txt"
            with open(note_path, "w") as f:
                f.write(f"Image Description: {page['imageDescription']}\n\n")
                f.write(f"Prompt: {prompt}\n\n")
                f.write(f"Error: {str(e)}\n\n")
                f.write(
                    "Please generate this image manually using the description above.\n"
                )
            print(f"Note created: {note_path}\n")

    print("✅ Image generation process completed!")
    print(f"Check the output folder: {output_folder}")


if __name__ == "__main__":
    generate_images()
