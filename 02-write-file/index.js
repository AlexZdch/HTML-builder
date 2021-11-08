const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

 const strPath = path.join(__dirname,'text.txt');
 const stream = fs.createWriteStream(
     strPath,
     'utf8'
   ); 
 
    stream.on('error', (err) => console.log(`Err: ${err}`));
    stream.on('finish', () => console.log('Done'));


  stdout.write('Введите текст\n');
 
  stdin.on('data', data => {
    const strData = data.toString().trim();  
    //console.log(strData === 'exit');
     if(strData === 'exit'){       
        process.exit();
     } else{ 
         stream.write(data.toString());
     }
});
  process.on('exit', () => {
    stdout.write('Запись в файл text.txt завершена! \n');  
    stream.end();
    });
  process.on('SIGINT', () => {
    process.exit();
    });

