import { getCurrentUser } from "@/lib/getUser";
import List from "@/models/List";
import { getGroqSuggestions } from "@/services/groqSuggestion.service";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const list = await List.findOne({
    _id: id,
    userId: user.userId,
  });

  if (!list) {
    return Response.json({ error: "List not found" }, { status: 404 });
  }

  const suggestions = await getGroqSuggestions(
    list.title,
    list.items.map((item: { name: string }) => item.name) as string[],
    "Nigeria"
  );

  return Response.json(suggestions);
}
