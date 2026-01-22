import { getAISuggestions } from "./aiSuggestions.service";

export const getSmartSuggestions = async ({
    userId,
    title,
    items,
  }: {
    userId: string;
    title: string;
    items: { name: string }[];
  }) => {
    const itemNames = items.map(i => i.name);
  
    const aiSuggestions = await getAISuggestions(
      title,
      itemNames
    );
  
    return aiSuggestions.map((s: { item: string; reason: string }) => ({
      item: s.item,
      reason: s.reason,
      confidence: 90,
      source: "ai",
    }));
  };
  