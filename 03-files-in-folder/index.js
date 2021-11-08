const fs = require('fs');
const path = require('path');

const strPath = path.join(__dirname,'secret-folder');

function listFiles(pathSecretFolder) {
    fs.readdir(pathSecretFolder, (err, files) => {
        if(err) throw err; 
        for (let file of files){
            const strPathFile = path.join(pathSecretFolder,file);
            fs.stat(strPathFile, (errStat, status) => {
                if(errStat) throw errStat;
                 if(status.isFile()) {
                    let fileSizeInKb = Math.round((status.size / 1024) * 100) / 100;
                    let fileName = path.basename(file).split('.');
                    let fileExtand = fileName[fileName.length - 1];
                    fileName.pop();
                    fileName = fileName.join('');
                    console.log(`${fileName} -- ${fileExtand} -- ${fileSizeInKb}Kb`);
                }
            });
        }
    });
}
listFiles(strPath);
