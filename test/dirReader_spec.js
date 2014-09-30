var dirReader = require('../lib/dirReader.js');
var should = require('should');

describe("Registration", function () {
  var dirItems = [];

  beforeEach(function (done) {
    var callback = function(error, data) {
      dirItems = data;
      done();
    };
    dirReader.getDirItems('./test/mock/', callback);
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
      dirReader.getFileContents(dirItems[1].dirPath, dirItems[1].fileName, callback);
    });
    it("is specifies an optional encoding argument", function(done) {
      var callback = function(error, data) {
        (error === null).should.be.true;
        dirItems[1] = data;
        dirItems[1].fileName.should.equal('file2.txt');
        dirItems[1].dirPath.should.equal('./test/mock/');
        dirItems[1].fileContent.should.equal('file2 contents');
        done();
      };
      dirReader.getFileContents(dirItems[1].dirPath, dirItems[1].fileName, 'utf8', callback);
    });
  });

  describe("an invalid getDirItems call", function () {
    it("is not a valid directory path", function(done) {
      var callback = function(error, data) {
        error.should.be.defined;
        error.message.should.startWith('ENOENT');
        done();
      };
      dirReader.getDirItems('./mock_does_not_exist', callback);
    });
    it("does not specify a callback", function(done) {
      try {
        dirReader.getDirItems('./mock_does_not_exist');
      } catch (error) {
        error.message.should.equal('callback is required and it must be a function');
        done();
      }
    });
    it("does not specify a callback as a function", function(done) {
      try {
        dirReader.getDirItems('./mock_does_not_exist', {});
      } catch (error) {
        error.message.should.equal('callback is required and it must be a function');
        done();
      }
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
      dirReader.getFileContents(dirItems[1].dirPath, dirItems[1].fileName, callback);
    });
    it("is not a valid file name", function(done) {
      var callback = function(error, data) {
        error.should.be.defined;
        error.message.should.startWith('ENOENT');
        done();
      };
      dirItems[1].fileName = 'doesNotExist.txt';
      dirReader.getFileContents(dirItems[1].dirPath, dirItems[1].fileName, callback);
    });
    it("does not specify a dirPath", function(done) {
      try {
        dirReader.getFileContents();
      } catch (error) {
        error.message.should.equal('dirPath is a required parameter and it must be a string');
        done();
      }
    });
    it("is a non string dirPath", function(done) {
      try {
        dirReader.getFileContents({});
      } catch (error) {
        error.message.should.equal('dirPath is a required parameter and it must be a string');
        done();
      }
    });
    it("does not specify a fileName", function(done) {
      try {
        dirReader.getFileContents(dirItems[1].dirPath);
      } catch (error) {
        error.message.should.equal('fileName is a required parameter and it must be a string');
        done();
      }
    });
    it("is a non string fileName", function(done) {
      try {
        dirReader.getFileContents(dirItems[1].dirPath, {});
      } catch (error) {
        error.message.should.equal('fileName is a required parameter and it must be a string');
        done();
      }
    });
    it("does not specify a callback", function(done) {
      try {
        dirReader.getFileContents(dirItems[1].dirPath, dirItems[1].fileName);
      } catch (error) {
        error.message.should.equal('callback is required and it must be a function');
        done();
      }
    });
    it("does not specify a callback as a function", function(done) {
      try {
        dirReader.getFileContents(dirItems[1].dirPath, dirItems[1].fileName, {});
      } catch (error) {
        error.message.should.equal('callback is required and it must be a function');
        done();
      }
    });
  });
});