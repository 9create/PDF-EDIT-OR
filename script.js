const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('pdfCanvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
  const page = pdfDoc.getPages()[0];

  const { width, height } = page.getSize();
  canvas.width = width;
  canvas.height = height;

  // Simple example: draw text on top
  page.drawText('Edited by PDF Editor App', {
    x: 50,
    y: height - 50,
    size: 18,
    color: PDFLib.rgb(0.95, 0.1, 0.1),
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const pdf = await pdfjsLib.getDocument(url).promise;
  const pageData = await pdf.getPage(1);
  const viewport = pageData.getViewport({ scale: 1 });
  await pageData.render({ canvasContext: ctx, viewport }).promise;

  downloadBtn.onclick = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'edited.pdf';
    link.click();
  };
});
