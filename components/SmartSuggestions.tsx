"use client";

import { useState } from "react";
import { fetchSmartSuggestions } from "@/services/suggestions.client";

type Props = {
  listId: string;
};

export default function SmartSuggestions({ listId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchSmartSuggestions(listId);
      setSuggestions(data.suggestions || data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Smart Suggestions</h3>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Generate"}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {!loading && suggestions.length === 0 && !error && (
        <p className="mt-3 text-sm text-gray-500">
          No suggestions yet. Click “Generate”.
        </p>
      )}

      <ul className="mt-4 space-y-2">
        {suggestions.map((item, idx) => (
          <li
            key={idx}
            className="rounded-md bg-gray-100 px-3 py-2 text-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
