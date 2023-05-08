const fs = require('fs');
const path = require('path');

const pathFile = path.join(__dirname, `${process.argv[2] ?? 'text'}.txt`);
fs.access(pathFile, (err) =>{
    if (err !== null) {
        fs.writeFile(pathFile, '', (err) => {
            // console.log(err);
        })
    }
})
process.stdin.on('data', (data) => {
    if(data.toString() === 'exit\r\n') {
        console.log('Bye!');
        process.exit(0);
    }
    fs.appendFile(pathFile, data.toString(), (err) => {
        // console.log(err);
    })
})
process.on('SIGINT', () => {
    console.log('Bye!');
    process.exit(0);
})
console.log('Hi, type some to console');
