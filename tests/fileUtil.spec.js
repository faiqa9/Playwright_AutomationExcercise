const { test, expect } = require('@playwright/test');
const {
    getFilePath,
    fileExists
} = require('../utils/fileUtil');

test('Check File Exists', async () => {

    const filePath = getFilePath('sample.pdf');

    console.log('File Path:', filePath);

    console.log('File Exists:', fileExists(filePath));

});