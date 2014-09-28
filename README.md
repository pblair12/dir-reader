# Directory Reader 

## Models
```
DirItem: {
  fileName: '',
  fileContent: '',
  dirPath: ''
}
```

### Methods
  * getDirItems
    * param: args, {dirPath: 'directory path'} the path of the directory to read the files from
    * param: callback, a function to call with the array of DirItem objects.
    * throws: exception
  * getFileContents
    * param: args, {dirItem: DirItem} a DirItem that will have its fileContents property populated and returned in the callback
    * param: callback, a function to call with the dirItem that has its fileContents populated
    * throws exception
    
## Example Usage
  * getDirItems
```
var callback = function(data) {
  dirItems = data;
};
dirReader.getDirItems({dirPath: './test/mock'}, callback);
```
  * getFileContents
```
var dirItem = new DirItem({dirPath: './test/mock', fileName: 'file2.txt' }); 
var callback = function(data) {
  dirItem = data; // now it has its fileContent populated
};
dirReader.getFileContents({dirItem: dirItem}, callback);
```