const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export const getAISuggestions = async (
  title: string,
  items: string[],
  country = "Nigeria"
) => {
  const prompt = `
You are an intelligent shopping assistant for users in ${country}.

Context:
- Shopping list title: "${title}"
- Items already added: ${items.join(", ")}

Task:
Suggest up to 6 items the user may have forgotten.

Requirements:
- Be culturally relevant to Nigeria
- Avoid duplicates
- Avoid luxury items
- Prefer essentials
- Output valid JSON only

Response format:
{
  "suggestions": [
    {
      "item": "string",
      "reason": "short explanation"
    }
  ]
}
`;

  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": process.env.GEMINI_API_KEY!,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error: ${err}`);
  }

  const data = await res.json();

  // 🔑 Extract model text
  const rawText =
    data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("Empty AI response");
  }

  // 1️⃣ Extract JSON safely
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("AI response did not contain valid JSON");
  }

  // 2️⃣ Parse
  const parsed = JSON.parse(jsonMatch[0]);

  // 3️⃣ Return only what you need
  return parsed.suggestions;
};
