const fs = require('fs/promises');
const path = require('path');
const {copyDir, removeDir} = require('../04-copy-directory');
const {mergeCss} = require('../05-merge-styles');

const srcCssFolder = path.join(__dirname, 'styles');
const srcAssetsFolder = path.join(__dirname, 'assets');
const distFolder = path.join(__dirname, 'project-dist');
const distAssetsFolder = path.join(distFolder, 'assets');
const componentsFolder = path.join(__dirname, 'components');

(async function () {
    await removeDir(distFolder);
    await copyDir(srcAssetsFolder, distAssetsFolder);
    await mergeCss(srcCssFolder, path.join(distFolder, 'style.css'));
    await mergeHtml(componentsFolder, path.join(__dirname, 'template.html'), path.join(distFolder, 'index.html'));
})();

async function getComponents (componentsFolder) {
    const result = {};
    const files = await fs.readdir(componentsFolder);
    for (const file of files) {
        const filePath = path.join(componentsFolder, file);
        const ext = path.extname(filePath);
        const name = path.basename(filePath, ext);
        if (ext === '.html') {
            result[name] = (await fs.readFile(filePath)).toString();
        }
    }
    return result;
}

async function mergeHtml (componentsFolder, baseFilePath, distPath) {
    const components = await getComponents(componentsFolder);
    let baseHtml = (await fs.readFile(baseFilePath)).toString();
    Object.entries(components).forEach(([key, value]) => {
        baseHtml = baseHtml.replace(`{{${key}}}`, value);
    });
    await fs.writeFile(distPath, baseHtml);
}

