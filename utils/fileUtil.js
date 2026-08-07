const path = require('path');
const fs = require('fs');  //check whether file exist

function getFilePath(fileName) {
    return path.join(process.cwd(), 'files', fileName);
}

function fileExists(filePath) {
    return fs.existsSync(filePath);
}

module.exports = {
    getFilePath,
    fileExists
};