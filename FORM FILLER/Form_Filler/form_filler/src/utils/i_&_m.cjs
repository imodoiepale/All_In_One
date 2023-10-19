/* eslint-disable no-undef */
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const path = require("path");

// Load the docx file as binary content
const content = fs.readFileSync(
    path.resolve(__dirname, "I_&_M.docx"),
    "binary"
);

const zip = new PizZip(content);

const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
});

// Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
doc.render({
    first_name: "James",
    last_name: "Imodoi",
    phone: "0652455478",
    description: "New Website",
    CIF_NUMBER: "12345",
    REF_NUMBER: "34678DGH",
    middle_name: "epale",
    Id_Number: "5555673",
    PASSPORT_NUMBER: "wakefg8",
    kra_pin: "ADSG4649J",
    nationality: "Canadian",
    salutation: "Mr",
    email: "james@gmail.com",
    postal_code: "3100",
    town: "nAIROBI",
    mobile_number: "0743854888",
    savers_acc: "✔"
});

const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
});

// buf is a nodejs Buffer, you can either write it to a
// file or res.send it with express for example.
fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);