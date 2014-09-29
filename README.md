# Directory Reader 

## Example
  * getDirItems
```
var dirReader = require('dir-reader');
var callback = function(error, results) {
  var dirItemsArray = results;
};
dirReader.getDirItems('./test/mock/', callback);
```
  * getFileContents
```
var dirReader = require('dir-reader');
var callback = function(error, results) {
  var dirItem = results; // now it has its fileContent populated
};
dirReader.getFileContents('./test/mock/', 'file2.txt', null, callback);
```

## Models
```
DirItem: {
  fileName: '',
  fileContent: '',
  dirPath: ''
}
```

### Methods
  * getDirItems(dirPath, callback)
    * dirPath String The path of the directory to read the files from.
    * callback Function(error, results) Where results is an array of DirItem objects.
  * getFileContents(dirPath, fileName, [encoding], callback)
    * dirPath String The path of the directory to read the file from.
    * fileName String The file name.
    * [encoding] String Encoding types are documented here: http://nodejs.org/api/buffer.html, defaults to 'utf8'.
    * callback Function(error, results) Where results is a DirItem object.