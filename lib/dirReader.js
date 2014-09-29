var DirItem = require('../models/DirItem');
var readify = require('readify');
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
  readify(args.dirPath, function(err, results) {
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

exports.getFileContents = function(args, callback) {
  assert(args.dirItem, "args.dirItem is a required parameter");
  var encoding = args.encoding || 'utf8';
  fs.readFile(args.dirItem.dirPath + args.dirItem.fileName, encoding, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    args.dirItem.fileContent = data;
    callback(null, args.dirItem);
    return args.dirItem;
  });
};