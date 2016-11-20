const electorn = require('electron');
const path = require('path');
const fs = require('fs');
const {ipcRenderer: ipc, desktopCapturer, screen} = electorn;

function onCapture(e, targetDir) {
    getMainScreen(desktopCapturer, screen, mainScreen => {
        const png = mainScreen.thumbnail.toPNG();
        const filePatch = path.join(targetDir, `${new Date()}.png`);
        saveScreenshot(png, filePatch);
    })
}

function getMainScreen(desktopCapturer, screen, cb) {
    const options = {types: ['screen'], thumbnailSize: screen.getPrimaryDisplay().workAreaSize}
    desktopCapturer.getSources(options, (err, sources) => {
       if(err){
           return console.log('Nie udało sie zrobic screena');
       }

       const isMain = source => source.name === 'Entire screen' || source.name === 'Screen 1'

        cb(sources.filter(isMain)[0]);
    });
}

function saveScreenshot(png, filePath){
    fs.writeFile(filePath, png, err => {
        if(err){
            return console.log('dupa dupa', err);
        }
    })
}
ipc.on('capture', onCapture);

