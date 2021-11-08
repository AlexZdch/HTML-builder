const fs = require('fs');
const path = require('path');

const strPathDest = path.join(__dirname,'files-copy');
const strPath = path.join(__dirname,'files');

fs.mkdir(strPathDest, { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir(strPathDest, (err, files) => {
        if (err) throw err;     
        for (const file of files) {
          fs.unlink(path.join(strPathDest, file), err => {
            if (err) throw err;
          });
        }
      });
      fs.readdir(strPath, (err, files) => {
        if (err){console.log("Error: read direction"); throw err;     }
        for (const file of files) {
          const strSourceTemp = path.join(strPath,file);
          const strDestinationTemp = path.join(strPathDest,file);
          fs.copyFile(strSourceTemp, strDestinationTemp,(err) => {
            if (err) throw err;
          })
        }
      });
});
