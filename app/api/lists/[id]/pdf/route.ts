import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit"; // <-- needed for custom fonts
import fs from "fs";
import path from "path";
import connectDB from "@/lib/mongodb";
import List from "@/models/List";
import { getCurrentUser } from "@/lib/getUser";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // params is a Promise in Next.js App Router
) {
  try {
    // Await params
    const { id } = await context.params;

    // Connect to database
    await connectDB();

    // Get current user
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the list
    const list = await List.findOne({ _id: id, userId: user.userId });
    if (!list) {
      return NextResponse.json({ error: "List not found" }, { status: 404 });
    }

    // ---- PDF GENERATION ----
    const pdfDoc = await PDFDocument.create();

    // Register fontkit for custom fonts
    pdfDoc.registerFontkit(fontkit);

    // Load Roboto font
    const fontPath = path.join(process.cwd(), "public/fonts/Roboto-Regular.ttf");
    const fontBytes = fs.readFileSync(fontPath);
    const robotoFont = await pdfDoc.embedFont(fontBytes);

    // Add a page
    const page = pdfDoc.addPage();
    const { height } = page.getSize();
    let y = height - 50;

    // Draw title
    page.drawText(list.title, {
      x: 50,
      y,
      size: 20,
      font: robotoFont,
    });

    y -= 30;

    // Draw items
    list.items.forEach((item: { name: string; price: number; quantity: number }) => { 
      const line = `${item.name} — Qty: ${item.quantity} — ₦${item.price}`;
      page.drawText(line, {
        x: 50,
        y,
        size: 12,
        font: robotoFont,
      });
      y -= 18;
    });

    y -= 20;

    //  Draw total
    page.drawText(`Total: ₦${list.total}`, {
      x: 50,
      y,
      size: 14,
      font: robotoFont,
    });

    //  Save PDF
    const pdfBytes = await pdfDoc.save();

    //  Return PDF response
    return new Response(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${list.title}.pdf"`,
      },
    });
  } catch (err: any) {
    console.error("PDF generation error:", err);
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}
