var dirReader = require('./lib/dirReader.js');

module.exports = {
  getDirItems: dirReader.getDirItems,
  getFileContents: dirReader.getFileContents
};