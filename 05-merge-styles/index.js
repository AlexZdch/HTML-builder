const fs = require('fs');
const path = require('path');

const strPathWrite = path.join(__dirname,'project-dist','bundle.css');
const strPathFolderRead = path.join(__dirname,'styles');

const streamWrite = fs.createWriteStream(
    strPathWrite,
    'utf8'
  ); 

streamWrite.on('error', (err) => console.log(`Err: ${err}`));
streamWrite.on('finish', () => console.log('Done'));

    fs.readdir(strPathFolderRead, (err, files) => {
        if(err) throw err; 
        for (let file of files){
            const strPathFile = path.join(strPathFolderRead,file);
            fs.stat(strPathFile, (errStat, status) => {
                if(errStat) throw errStat;
                if(status.isFile()) {
                    let fileName = path.basename(file).split('.');
                    let fileExtand = fileName[fileName.length - 1];
                    if (fileExtand ==='css'){
                        const streamFileRead = fs.createReadStream(
                            strPathFile,
                            'utf8'
                          );
                            streamFileRead.on('data', (data) => {
                            streamWrite.write(data.toString());
                          });
                          streamFileRead.on('error', (err) => console.log(`Error: ${err}`));
                    }
                }
            });
        }
    });
