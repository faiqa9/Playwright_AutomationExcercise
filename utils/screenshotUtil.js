async function takeScreenshot(page, fileName) {

    const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, '-');

    await page.screenshot({
        path: `screenshots/${fileName}-${timestamp}.png`,
        fullPage: true
    });

}

module.exports = { takeScreenshot };