const electron = require('electron');
const path = require('path');
const counter = require('./counter/countdown');

const app = electron.app;
const ipc = electron.ipcMain;

app.on('ready', () => {
    console.log('rdy');
    let window = new electron.BrowserWindow({
        height: 400,
        width: 400,
    });

    window.loadURL(path.join('file://', __dirname, 'start', 'index.html'));

    window.on('closed', () => {
        console.log('zamyka');
        delete window;
    });

    let counterWindow = new electron.BrowserWindow({
        height: 400,
        widht: 500
    });

    counterWindow.on('close', () => {
        delete counterWindow;
        clearInterval(timer);
    });

    counterWindow.loadURL(path.join('file://', __dirname, 'counter', 'index.html'));

    var timer;
    ipc.on('counter-start', e => {
        if (timer) {
            console.log('already running');
            return;
        }
        timer = counter(count => {
            counterWindow.webContents.send('counter-update', count);
        });
    });
});


console.log('test');