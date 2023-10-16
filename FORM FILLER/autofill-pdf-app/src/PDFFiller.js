// PdfFiller.js
import  { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

const PdfFiller = ({ user, template }) => {
  const [filledPdf, setFilledPdf] = useState(null);

  const fillPdf = async () => {
    // Load PDF template
    const templateBytes = await template.arrayBuffer();
    const pdfDoc = await PDFDocument.load(templateBytes);

    // Access the first page
    const page = pdfDoc.getPage(0);

    // Example: Fill a field named 'clientName' with user's name
    page.drawText(user.name, {
      x: 50,
      y: 500,
      font: await pdfDoc.embedFont('Helvetica'),
      color: rgb(0, 0, 0),
    });

    // Save the filled PDF
    const filledPdfBytes = await pdfDoc.save();
    const filledPdfBlob = new Blob([filledPdfBytes], { type: 'application/pdf' });

    setFilledPdf(URL.createObjectURL(filledPdfBlob));
  };

  return (
    <div>
      <h2>Filled PDF</h2>
      <button onClick={fillPdf}>Fill PDF</button>
    </div>
  );
};

export default PdfFiller;
