var DirItem = require('../models/DirItem');
var readify = require('readify');
var fs = require('fs');
var foreach = require('foreach');
var assert = require('assert');

exports.getDirItems = function(dirPath, callback) {
  assert(dirPath, "dirPath is a required parameter");
  var dirItems = [];
  var options = {
    recursive: false,
    normalize: true
  };
  readify(dirPath, function(err, results) {
    if(err) {
      callback(err);
      return;
    }
    var i = 0;
    for (i = 0; i < results.files.length; i++) {
      var dirItem = new DirItem({});
      dirItem.fileName = results.files[i].name;
      dirItem.dirPath = results.path;
      dirItems.push(dirItem);
    };
    callback(null, dirItems);
    return dirItems;
  });
};

exports.getFileContents = function(dirPath, fileName, encoding, callback) {
  assert(dirPath, "dirPath is a required parameter");
  assert(fileName, "fileName is a required parameter");
  encoding = encoding || 'utf8';
  fs.readFile(dirPath + fileName, encoding, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    var dirItem = new DirItem({fileName: fileName, fileContent: data, dirPath: dirPath});
    callback(null, dirItem);
    return dirItem;
  });
};