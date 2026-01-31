"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { fetchSmartSuggestions } from "@/services/suggestions.client";
import { Plus, Check } from "lucide-react";

type Item = {
  name: string;
  price: number;
  quantity: number;
};

type Props = {
  listId: string;
  items: Item[];
  title: string;
  onAddItem: (itemName: string) => void; // New prop for adding items
};

export type SmartSuggestionsRef = {
  triggerGenerate: () => void;
};

// Define the suggestion type to handle both formats
type Suggestion = string | { item: string; reason: string };

const SmartSuggestions = forwardRef<SmartSuggestionsRef, Props>(
  ({ listId, items, title, onAddItem }, ref) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

    const handleGenerate = async () => {
      setLoading(true);
      setError(null);
      setAddedItems(new Set()); // Reset added items when generating new suggestions

      try {
        let data;

        if (listId) {
          // For existing/saved lists: use the ID-based endpoint
          data = await fetchSmartSuggestions(listId);
        } else {
          // For new/unsaved lists: send items directly
          const response = await fetch("/api/suggestions/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title,
              items: items.filter((item) => item.name.trim() !== ""),
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.error || "Failed to generate suggestions"
            );
          }

          data = await response.json();
        }

        // Handle different response formats
        setSuggestions(data.suggestions || data);
      } catch (err: any) {
        setError(err.message || "Failed to generate suggestions");
      } finally {
        setLoading(false);
      }
    };

    useImperativeHandle(ref, () => ({
      triggerGenerate: handleGenerate,
    }));

    /**
     * Extract item name from suggestion
     * Handles both string format and object format {item, reason}
     */
    const getItemName = (suggestion: Suggestion): string => {
      return typeof suggestion === "string" ? suggestion : suggestion.item;
    };

    /**
     * Extract reason from suggestion if available
     */
    const getReason = (suggestion: Suggestion): string | null => {
      return typeof suggestion === "object" && "reason" in suggestion
        ? suggestion.reason
        : null;
    };

    /**
     * Check if an item already exists in the main list
     */
    const isItemInList = (itemName: string): boolean => {
      return items.some(
        (item) =>
          item.name.toLowerCase().trim() === itemName.toLowerCase().trim()
      );
    };

    /**
     * Handle adding a suggestion to the main list
     */
    const handleAddSuggestion = (suggestion: Suggestion) => {
      const itemName = getItemName(suggestion);

      // Call the parent's add function
      onAddItem(itemName);

      // Track that this item has been added
      setAddedItems((prev) => new Set(prev).add(itemName.toLowerCase()));
    };

    /**
     * Check if a suggestion has been added
     */
    const isAdded = (suggestion: Suggestion): boolean => {
      const itemName = getItemName(suggestion);
      return (
        addedItems.has(itemName.toLowerCase()) || isItemInList(itemName)
      );
    };

    return (
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg text-slate-900">
              Smart Suggestions
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {listId
                ? "AI-powered recommendations based on your list"
                : "Add items above and click Generate to get AI suggestions"}
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Thinking..." : "Generate"}
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!loading && suggestions.length === 0 && !error && (
          <div className="mt-4 rounded-lg bg-slate-50 border border-slate-200 p-6 text-center">
            <p className="text-sm text-slate-500">
              No suggestions yet. Click "Generate" to get AI-powered
              recommendations.
            </p>
          </div>
        )}

        {loading && (
          <div className="mt-4 space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-12 rounded-lg bg-slate-100 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && suggestions.length > 0 && (
          <ul className="mt-4 space-y-2">
            {suggestions.map((suggestion, idx) => {
              const itemName = getItemName(suggestion);
              const reason = getReason(suggestion);
              const added = isAdded(suggestion);

              return (
                <li
                  key={idx}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 transition-colors ${
                    added
                      ? "bg-green-50 border-green-200"
                      : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${
                        added ? "text-green-700" : "text-slate-900"
                      }`}
                    >
                      {itemName}
                    </p>
                    {reason && (
                      <p
                        className={`text-xs mt-1 ${
                          added ? "text-green-600" : "text-slate-500"
                        }`}
                      >
                        {reason}
                      </p>
                    )}
                  </div>

                  {added ? (
                    <div className="ml-3 flex items-center gap-1 text-xs font-medium text-green-700">
                      <Check size={14} />
                      Added
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddSuggestion(suggestion)}
                      className="ml-3 flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 transition-colors flex-shrink-0"
                      title="Add to list"
                    >
                      <Plus size={14} />
                      Add
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
);

SmartSuggestions.displayName = "SmartSuggestions";

export default SmartSuggestions;