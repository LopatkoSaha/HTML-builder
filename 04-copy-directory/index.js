const fs = require('fs/promises');
const path = require('path');

const srcFolder = path.join(__dirname, 'files');
const distFolder = path.join(__dirname, 'files-copy');

(async function () {
    await removeDir(distFolder);
    await copyDir(srcFolder, distFolder);
})();

async function removeDir(dirPath) {
    let items;
    try {
        items = await fs.readdir(dirPath, {withFileTypes: true});
    }
    catch (err) {
        if (err.name) {
            return;
        }
        throw err;
    }
    for (const item of items) {
        if (item.isFile()) {
            await fs.unlink(path.join(dirPath, item.name));
        } else {
            await removeDir(path.join(dirPath, item.name));
        }
    }
    await fs.rmdir(dirPath);
}

async function copyDir(srcPath, distPath) {
    await fs.mkdir(distPath, {recursive: true});
    const items = await fs.readdir(srcPath, {withFileTypes: true});
    for (const item of items) {
        const srcItemPath = path.join(srcPath, item.name);
        const distItemPath = path.join(distPath, item.name);
        if (item.isFile()) {
            await fs.copyFile(srcItemPath, distItemPath);
        } else {
            await copyDir(srcItemPath, distItemPath);
        }
    }
}


