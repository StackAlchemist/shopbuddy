import { getCurrentUser } from "@/lib/getUser";
import { getGroqSuggestions } from "@/services/groqSuggestion.service";
import { NextRequest, NextResponse } from "next/server";

type Item = {
  name: string;
  price: number;
  quantity: number;
};

type RequestBody = {
  title: string;
  items: Item[];
};

/**
 * POST /api/suggestions/generate
 * Generate suggestions for unsaved lists (new lists without an ID)
 * Uses the same Groq AI logic as the saved lists endpoint
 */
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const { title, items }: RequestBody = await req.json();

    // Validate that we have items
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items provided" },
        { status: 400 }
      );
    }

    // Filter out empty items and extract names
    const itemNames = items
      .filter(item => item.name && item.name.trim() !== "")
      .map(item => item.name);

    if (itemNames.length === 0) {
      return NextResponse.json(
        { error: "Please add at least one valid item" },
        { status: 400 }
      );
    }

    // same Groq AI service as the existing endpoint
    const suggestions = await getGroqSuggestions(
      title || "Shopping List", // Use provided title or default
      itemNames,
      "Nigeria" // this dynamic based on user location
    );

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return NextResponse.json(
      { error: "Failed to generate suggestions" },
      { status: 500 }
    );
  }
}