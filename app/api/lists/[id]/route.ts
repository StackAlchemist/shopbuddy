import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getUser";
import {
  updateList,
  deleteList,
} from "@/services/list.service";
import connectDB from "@/lib/mongodb";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const updated = await updateList(id, user.userId, body);

  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await deleteList(params.id, user.userId);
  return NextResponse.json({ success: true });
}
    