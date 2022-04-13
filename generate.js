const html_to_pdf = require('html-pdf-node');
const path = require('path');
const qpdf = require("node-qpdf");
const fs = require('fs');


(async () => {
    const args = process.argv.slice(2)
    const url = args[0].split('=').slice(1)[0];
    const unlockKey = args[1].split('=').slice(1)[0];

    let option = { format: 'A4' };

  
    let file = { url };
    const buff = await html_to_pdf.generatePdf(file, option).then(pdfBuffer => {
        //console.log("PDF Buffer:-", pdfBuffer);
        return pdfBuffer
    });
    const pdf = fs.createWriteStream("./test.pdf").write(buff); 
       const options = {
        keyLength: 128,
        password: unlockKey
    }
    const localFilePath = path.join(__dirname, "./test.pdf");
    const outputFilePath = path.join(__dirname, "/encrypted.pdf");
    await qpdf.encrypt(localFilePath, options, outputFilePath);

})();
