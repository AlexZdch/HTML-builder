const fs = require('fs');
const path = require('path');



const strPathTemplate = path.join(__dirname,'template.html');
const streamTemplate = fs.createReadStream(
    strPathTemplate,
    'utf8'
  );

const strPathDest = path.join(__dirname,'project-dist');

fs.mkdir(strPathDest, { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir(strPathDest, (err, files) => {
        if (err) throw err;     

streamTemplate.on('data', (data) => {
    let strTemplate = data.toString();
    let arrTemplateFiles = [];
    for(let i = 0; i < strTemplate.length; i ++ ){
      if(strTemplate[i] === '{' && strTemplate[i + 1] === '{'){
        let j = i + 2;
        let strTemp = '';
        while(strTemplate[j] !== '}'){
          strTemp += strTemplate[j];
          j ++;
        }
        strTemp += '.html';
        arrTemplateFiles.push(strTemp);
        i = j + 2;
      }
    }

const strPathWrite = path.join(strPathDest,'index.html');
const strPathFolderRead = path.join(__dirname,'components');

    const streamFileWrite = fs.createWriteStream(
        strPathWrite,
        'utf8'
      );

let index = 0;
let j = 0;
const arrLength = arrTemplateFiles.length;    

function fun (index,j,arr){
    if(index == arrLength){
        let temp = '';
          while( j < strTemplate.length){
            temp += strTemplate[j];
            j++;
          }
          streamFileWrite.write(temp);         
      return;
      }
   
    const streamFileRead = fs.createReadStream(
        path.join(strPathFolderRead, arr[index]),
        'utf8'
      );
        streamFileRead.on('data', (data) => {
          let temp = '';
          while(strTemplate[j] !== '{' && j < strTemplate.length){
            temp += strTemplate[j];
            j++;
          }
          while (strTemplate[j] !== '}'){
            j ++;
          }
          streamFileWrite.write(temp);         
          streamFileWrite.write(data.toString());
            index ++ ;
            j = j + 2;
            fun(index,j,arr);
      });
}

fun(index,j,arrTemplateFiles);

  });

  streamTemplate.on('error', (err) => console.log(`Error: ${err}`));

const strPathWriteCss = path.join(strPathDest,'style.css');
const strPathFolderReadCss = path.join(__dirname,'styles');

const streamWriteCss = fs.createWriteStream(
    strPathWriteCss,
    'utf8'
  ); 

streamWriteCss.on('error', (err) => console.log(`Err: ${err}`));
streamWriteCss.on('finish', () => console.log('Done'));

    fs.readdir(strPathFolderReadCss, (err, files) => {
        if(err) throw err; 
        for (let file of files){
            const strPathFileCss = path.join(strPathFolderReadCss,file);
            fs.stat(strPathFileCss, (errStat, status) => {
                if(errStat) throw errStat;
                if(status.isFile()) {
                    let fileName = path.basename(file).split('.');
                    let fileExtand = fileName[fileName.length - 1];
                    if (fileExtand ==='css'){
                        const streamFileReadCss = fs.createReadStream(
                            strPathFileCss,
                            'utf8'
                          );
                            streamFileReadCss.on('data', (data) => {
                            streamWriteCss.write(data.toString());
                          });
                          streamFileReadCss.on('error', (err) => console.log(`Error: ${err}`));
                    }
                }
            });
        }
    });

const strPathDestAssets = path.join(strPathDest,'assets');
const strPathAssets = path.join(__dirname,'assets');

function funDelete(strPathDestAssets){
  fs.mkdir(strPathDestAssets, { recursive: true }, (err) => {
      if (err) throw err;
          fs.readdir(strPathDestAssets, (err, files) => {
          if (err){console.log("Error: read direction"); throw err;     }
          for (const file of files) {
            const strPathFile = path.join(strPathDestAssets,file);
            fs.stat(strPathFile, (errStat, status) => {
                if(errStat) throw errStat;
                if (status.isDirectory()){
                    funDelete(path.join(strPathDestAssets,file));
                } else{     
                  fs.unlink(path.join(strPathDestAssets, file), err => {
                    if (err) throw err;
                  });                    
                }
            });   
           }
        });
  });      
}

function funCreate(strPathDestAssets, strPathAssets){

  fs.mkdir(strPathDestAssets, { recursive: true }, (err) => {
      if (err) throw err;
        fs.readdir(strPathAssets, (err, files) => {
          if (err){console.log("Error: read direction"); throw err;     }
          for (const file of files) {
            const strPathFile = path.join(strPathAssets,file);
            fs.stat(strPathFile, (errStat, status) => {
                if(errStat) throw errStat;
                if (status.isDirectory()){
                    funCreate(path.join(strPathDestAssets,file),path.join(strPathAssets,file));
                } else{       
                  const strSourceTemp = path.join(strPathAssets,file);
                  const strDestinationTemp = path.join(strPathDestAssets,file);
                  fs.copyFile(strSourceTemp, strDestinationTemp,(err) => {
                    if (err) throw err;
                  });
                }
            });   
           }
        });
  });
}

funDelete(strPathDestAssets);
funCreate(strPathDestAssets, strPathAssets);

     });
});

  
