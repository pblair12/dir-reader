var dirReader = require('../lib/dirReader.js');
var should = require('should');

describe("Registration", function () {
  var dirItems = [];

  before(function (done) {
    var callback = function(data) {
      dirItems = data;
      done();
    };
    dirReader.getDirItems({dirPath: './test/mock'}, callback);
  });

  // happy path
  describe("a valid read of a directory", function () {
    it("is successful", function() {
      dirItems.length.should.equal(2);
      dirItems[0].fileName.should.equal('file1.html');
      dirItems[0].dirPath.should.equal('./test/mock');
      dirItems[1].fileName.should.equal('file2.txt');
      dirItems[1].dirPath.should.equal('./test/mock');
    });
  });
  describe("a valid read of a file contents", function () {
    it("is successful", function() {
      var callback = function(data) {
        dirItems[1] = data;
        dirItems[1].fileName.should.equal('file2.txt');
        dirItems[1].dirPath.should.equal('./test/mock');
        dirItems[1].fileName.should.equal('file2.txt');
        dirItems[1].fileContent.should.equal('file2 contents');
        done();
      };
      dirReader.getFileContents({dirItem: dirItems[1]}, callback);
    });
  });

  describe("a bad dirctory path", function () {
    it("is not successful", function() {
      try {
        dirReader.getDirItems({dirPath: './mock_does_not_exist'});
      } catch (e) {
        e.should.be.defined();
      }
    });
  });
});