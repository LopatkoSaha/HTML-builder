const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'secret-folder');
fs.readdir(pathFolder, {withFileTypes: true},(err, items) => {
    items.forEach((item) => {
        if (item.isFile()) {
            const filePath = path.join(pathFolder, item.name);
            const ext = path.extname(filePath);
            const fileName = path.basename(filePath, ext);
            fs.stat(filePath, (err, stats) =>{
                console.log(`${fileName} - ${ext.slice(1)} - ${stats.size} byte`);
            })
        }
    }
)})
