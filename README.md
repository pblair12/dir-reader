# Directory Reader 

## Example
  * getDirItems
```
var callback = function(error, results) {
  dirItems = results;
};
dirReader.getDirItems({dirPath: './test/mock'}, callback);
```
  * getFileContents
```
var dirItem = new DirItem({dirPath: './test/mock', fileName: 'file2.txt' }); 
var callback = function(error, results) {
  dirItem = results; // now it has its fileContent populated
};
dirReader.getFileContents({dirItem: dirItem}, callback);
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
  * getDirItems(args, callback)
    * args Object 
      * dirPath String The path of the directory to read the files from
    * callback Function(error, results) Where results is an array of DirItem objects.
  * getFileContents(args, callback)
    * args Object
      * dirItem DirItem A DirItem that will have its fileContents property populated and returned in the callback
      * [encoding] String Encoding types are documented here: http://nodejs.org/api/buffer.html, defaults to 'utf8'
    * callback Function(error, results) Where results is a DirItem object.