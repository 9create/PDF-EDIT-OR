const fileInput = document.getElementById('fileInput');
const downloadBtn = document.getElementById('downloadBtn');

let modifiedPdfBytes = null;

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  firstPage.drawText("Edited via Nitu PDF App", {
    x: 50,
    y: firstPage.getHeight() - 50,
    size: 18,
    color: PDFLib.rgb(0.2, 0.5, 0.9),
  });

  modifiedPdfBytes = await pdfDoc.save();
  alert("✅ PDF updated! Click 'Download Edited PDF'");
});

downloadBtn.addEventListener('click', () => {
  if (!modifiedPdfBytes) {
    alert("❗Please upload a PDF first.");
    return;
  }
  const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "edited.pdf";
  link.click();
});
