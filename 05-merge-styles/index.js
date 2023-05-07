const fs = require('fs');
const path = require('path');

const srcFolder = path.join(__dirname, 'styles');
const distFolder = path.join(__dirname, 'project-dist');

const dataArray = [];
fs.readdir(srcFolder, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach((file) => {
            const extension = path.extname(file);
            fs.stat(path.join(srcFolder, file), (err, stat) => {
                if (err) throw err;
                if (stat.isFile() && extension === '.css') {
                    fs.readFile(path.join(srcFolder, file), 'utf8', (err, data) => {
                        if (err) throw err;
                        dataArray.push(data);
                        if (dataArray.length === files.filter((f) => path.extname(f) === '.css').length) {
                            fs.writeFile(path.join(distFolder, 'bundle.css'), dataArray.join('\n'), () => {});
                        }
                    });
                }
            });
        });
    }
});
