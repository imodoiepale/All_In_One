// PdfPreviewAndDownload.js
import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfPreviewAndDownload = ({ pdfDoc, onDownload }) => {
  return (
    <div>
      <h2>Preview</h2>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${process.env.PDFJS_VERSION}/build/pdf.worker.min.js`}>
        <Viewer fileUrl={pdfDoc} />
      </Worker>
      <button onClick={onDownload}>Download PDF</button>
    </div>
  );
};

export default PdfPreviewAndDownload;
