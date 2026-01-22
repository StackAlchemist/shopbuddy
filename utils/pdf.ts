import { PDFDocument } from "pdf-lib";

export async function generatePDF(list: { title: string; items: { name: string; price: number }[] }) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  page.drawText(list.title, { x: 50, y: 750 });

  let y = 700;
  list.items.forEach((item: { name: string; price: number }) => {
    page.drawText(
      `${item.name} - ₦${item.price}`,
      { x: 50, y }
    );
    y -= 20;
  });

  return await pdfDoc.save();
}
