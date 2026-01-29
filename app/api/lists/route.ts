import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getUser";
import { createList, getLists, updateList } from "@/services/list.service";
import connectDB from "@/lib/mongodb";
export async function GET() {
    await connectDB();
  
    const user = await getCurrentUser(); // 👈 AWAIT
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const lists = await getLists(user.userId);
    return NextResponse.json(lists);
  }
  
  export async function POST(req: Request) {
    await connectDB();
  
    const user = await getCurrentUser(); // 👈 AWAIT
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const body = await req.json();
    const list = await createList(user.userId, body);
  
    return NextResponse.json(list, { status: 201 });
  }

