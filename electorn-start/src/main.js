const electron = require('electron');
const path = require('path');

const app = electron.app;

app.on('ready', () => {
    console.log('rdy');
    let window = new electron.BrowserWindow({
        height: 400,
        width: 400,
    });

    window.loadURL(path.join('file://', __dirname, 'index.html'));

    window.on('closed', () => {
        console.log('zamyka');
        delete window;
    });
});

console.log('test');