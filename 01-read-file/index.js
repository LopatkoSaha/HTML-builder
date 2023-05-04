const fs = require('fs');
const path = require('path'); 

// fs.readFile(path.join(__dirname, "text.txt"), (err, data) => {
//     console.log(err);
//     console.log(data.toString());
// });
const readStream = fs.createReadStream(path.join(__dirname, "text.txt"));
let data = '';
readStream.on('data', (chunk) => {
    data += chunk.toString();
});
readStream.on('end', () => {
    console.log(data);
})