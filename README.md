# Directory Reader 

## Installation
  
  npm install git://github.com/pblair12/dir-reader.git --save

## Usage

  * getDirItems - Takes a directory path and returns an array of DirItem objects that give the dirPath and fileName for each.  The fileContents are not populated.
```
var dirReader = require('dir-reader');
var callback = function(error, results) {
  var dirItemsArray = results;
};
dirReader.getDirItems('./test/mock/', callback);
```
  * getFileContents - Takes a dirPath and a fileName and returns a DirItem object that is populated with the dirPath, fileName, and fileContents.
```
var dirReader = require('dir-reader');
var callback = function(error, results) {
  var dirItem = results; // now it has its fileContent populated
};
dirReader.getFileContents('./test/mock/', 'file2.txt', callback);
// calling it with optional argument
// dirReader.getFileContents('./test/mock/', 'file2.txt', 'utf8', callback);
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