export async function fetchSmartSuggestions(listId: string) {
    const res = await fetch(`/api/lists/${listId}/suggestions`, {
      method: "GET",
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to get suggestions");
    }
  
    return res.json();
  }
  