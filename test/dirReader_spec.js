var dirReader = require('../lib/dirReader.js');
var should = require('should');

describe("Registration", function () {
  var dirItems = [];

  beforeEach(function (done) {
    var callback = function(error, data) {
      dirItems = data;
      done();
    };
    dirReader.getDirItems({dirPath: './test/mock/'}, callback);
  });

  // happy path
  describe("a valid read of a directory", function () {
    it("is successful", function() {
      dirItems.length.should.equal(2);
      dirItems[0].fileName.should.equal('file1.html');
      dirItems[0].dirPath.should.equal('./test/mock/');
      dirItems[1].fileName.should.equal('file2.txt');
      dirItems[1].dirPath.should.equal('./test/mock/');
    });
  });
  describe("a valid read of a file contents", function () {
    it("is successful", function(done) {
      var callback = function(error, data) {
        (error === null).should.be.true;
        dirItems[1] = data;
        dirItems[1].fileName.should.equal('file2.txt');
        dirItems[1].dirPath.should.equal('./test/mock/');
        dirItems[1].fileContent.should.equal('file2 contents');
        done();
      };
      dirReader.getFileContents({dirItem: dirItems[1]}, callback);
    });
  });

  describe("an invalid getDirItems call", function () {
    it("is not a valid directory path", function(done) {
      var callback = function(error, data) {
        error.should.be.defined;
        error.message.should.startWith('ENOENT');
        done();
      };
      dirReader.getDirItems({dirPath: './mock_does_not_exist'}, callback);
    });
  });

  describe("an invalid getFileContents call", function () {
    it("is not a valid directory path", function(done) {
      var callback = function(error, data) {
        error.should.be.defined;
        error.message.should.startWith('ENOENT');
        done();
      };
      dirItems[1].dirPath = './mock_does_not_exist/';
      dirReader.getFileContents({dirItem: dirItems[1]}, callback);
    });
    it("is not a valid file name", function(done) {
      var callback = function(error, data) {
        error.should.be.defined;
        error.message.should.startWith('ENOENT');
        done();
      };
      dirItems[1].fileName = 'doesNotExist.txt';
      dirReader.getFileContents({dirItem: dirItems[1]}, callback);
    });
  });
});