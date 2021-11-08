const fs = require('fs');
const path = require('path');

const strPath = path.join(__dirname,'text.txt');
const stream = fs.createReadStream(
    strPath,
    'utf8'
  );
  stream.on('data', (data) => console.log(data));
  stream.on('error', (err) => console.log(`Error: ${err}`));