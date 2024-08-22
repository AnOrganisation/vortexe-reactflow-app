import { PDFDocument, rgb } from "pdf-lib";

export const generatePDF = async (rawText) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const { width, height } = page.getSize();
  const fontSize = 12;
  const textLines = rawText.split("\n");

  let y = height - fontSize;

  textLines.forEach((line) => {
    page.drawText(line, {
      x: 20,
      y,
      size: fontSize,
      color: rgb(0, 0, 0),
    });
    y -= fontSize + 5; // Add some padding between lines
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  return URL.createObjectURL(blob);
};
