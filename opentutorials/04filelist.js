var testfolder = './data';
var fs = require('fs');

fs.readdir(testfolder, function(err, files){
  console.log(files);  
});