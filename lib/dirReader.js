var DirItem = require('../models/DirItem');
var readDirFiles = require('read-dir-files');
var fs = require('fs');
var foreach = require('foreach');
var assert = require('assert');

exports.getDirItems = function(args, callback) {
  assert(args.dirPath, "dirPath is a required parameter");
  var dirItems = [];
  var options = {
    recursive: false,
    normalize: true
  };
  readDirFiles.read(args.dirPath, options, function(err, files) {
    if(err) { throw err; }
    foreach(files, function (fileContents, fileName) {
      var dirItem = new DirItem({});
      dirItem.fileName = fileName;
      dirItem.dirPath = args.dirPath;
      dirItems.push(dirItem);
    });
    callback(dirItems);
    return dirItems;
  });
};

exports.getFileContents = function(args, callback) {
  assert(args.dirItem, "args.dirItem is a required parameter");
  var encoding = args.encoding || 'utf8';
  fs.readFile(args.dirItem.dirPath + args.dirItem.fileName, encoding, function (err, data) {
    if(err) { throw err; }
    dirItem.contents = data;
    callback(dirItem);
    return dirItem;
  });
};