// utils/pdfUtil.js
import { PDFDocument } from '@pdf-lib/core';

export const generatePdf = async (templateBytes, userData) => {
  try {
    // Load the template PDF
    const templatePdf = await PDFDocument.load(templateBytes);

    // Add data to the template
    const form = templatePdf.getForm();
    const fields = form.getFields();
    fields.forEach((field) => {
      if (field instanceof form.PDFField) {
        field.setValue(userData[field.getName()] || '');
      }
    });

    // Save the modified PDF
    return templatePdf.save();
  } catch (error) {
    console.error('Error generating PDF:', error.message);
    throw error;
  }
};
