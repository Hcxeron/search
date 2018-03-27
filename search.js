'use strict';

var fullPathArr = [];

// legal amount of arguments -- is 4 for : node search.js [substring] [extention]
if (process.argv.length == 4) {
  var fs = require('fs');
  var scanFolderAndSubFolders = function (currentPath) {
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
      var currentFile = currentPath + '\\' + files[i];
      var stats = fs.statSync(currentFile);
      if (stats.isFile()) {
        var filePathArr = [];
        filePathArr.push(currentPath);
        filePathArr.push(files[i].substr(0, files[i].indexOf('.')));
        filePathArr.push(files[i].substr(files[i].indexOf('.') + 1));
        fullPathArr.push(filePathArr);
      }
      else if (stats.isDirectory()) {
        scanFolderAndSubFolders(currentFile);
      }
    }
  };
  scanFolderAndSubFolders(__dirname);

  var searchFilesAndPrint = function () {
    var foundFlag = false;
    fullPathArr.forEach(filePath => {
      // match extension and substring with arguments
      if (filePath[2] == process.argv[3] && filePath[1].includes(process.argv[2])) {
        console.log(filePath[0] + '\\' + filePath[1] + '.' + filePath[2]);
        if (!foundFlag) {
          foundFlag = true;
        }
      }
    }
    );

    if (!foundFlag) {
      console.log('no file was found');
    }
  };
  searchFilesAndPrint();
}
else {
  console.log('USAGE: node search [EXT] [TEXT]');
}

