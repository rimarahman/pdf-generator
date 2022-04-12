const puppeteer = require("puppeteer");


(async () => {
    const args = process.argv.slice(2)
    const url = args[0].split('=').slice(1)[0];
    const unlockKey = args[1].split('=').slice(1)[0];


    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: "networkidle2"
    });
    await page.setViewport({ width: 1680, height: 1050 });
    await page.pdf({
        path: "generated.pdf",
        format: "A4",
        printBackground: true,
        displayHeaderFooter: true,
        margin: {
            top: '38px',
            right: '38px',
            bottom: '38px',
            left: '38px'
        }
    });


    await browser.close();
})();