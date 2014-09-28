var DirItem = function(args) {
  var dirItem = {};
  dirItem.fileName = args.fileName || "";
  dirItem.fileContent = args.fileContent || "";
  dirItem.dirPath = args.dirPath || "";
  return dirItem;
};
module.exports = DirItem;