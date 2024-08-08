const express = require('express');
const { chromium } = require('playwright');

const app = express ();
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});



app.post("/pdf", (request, response) => {
   const status = {
      "Status": "Running"
   };

    const ret = "";
    const url = request.body.url;
    const outputFilePath = request.body.file;

    convertUrlToPdf(url, outputFilePath).then(() => {
        response.send({"Success": true, "Location": outputFilePath});
    }).catch((error) => {
        response.send({"Success": false, "Error": error});
    });
    
    // response.send(ret);
});


async function convertUrlToPdf(url, outputFilePath) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.pdf({ path: outputFilePath, format: 'A4' });
    await browser.close();
}