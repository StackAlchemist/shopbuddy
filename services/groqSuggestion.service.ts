import { groq } from "@/lib/groq";

export const getGroqSuggestions = async (
  title: string,
  items: string[],
  country = "Nigeria"
) => {
  const prompt = `
You are an intelligent shopping assistant for users in ${country}.

Shopping list title: "${title}"
Items already added: ${items.join(", ")}

Task:
Suggest up to 6 items the user may have forgotten.

Rules:
- Nigerian context
- Essentials only
- Avoid duplicates
- Avoid luxury items
- Return VALID JSON ONLY
- No markdown
- No explanations outside JSON

Response format:
{
  "suggestions": [
    { "item": "string", "reason": "short reason" }
  ]
}
`;

  const completion = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [
      {
        role: "system",
        content:
          "You are a strict JSON generator. Output valid JSON only.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
    max_tokens: 700,
    top_p: 0.9,
  });

  const rawText = completion.choices[0]?.message?.content;

  if (!rawText) {
    throw new Error("Groq returned empty response");
  }

  //  extraction
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Groq response did not contain JSON");
  }

  return JSON.parse(jsonMatch[0]).suggestions;
};
