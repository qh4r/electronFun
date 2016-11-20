const electron = require('electron');
const path = require('path');

const {app, Menu, Tray, ipcMain, globalShortcut, BrowserWindow} = electron;
console.log(__dirname)

app.on('ready', _ => {
    let mainWindow = new BrowserWindow({
        height: 0,
        widht: 0,
        resizable: 0,
        frame: 0
    });
    mainWindow.loadURL(path.join('file://', __dirname, 'index.html'));

    globalShortcut.register('Cmd+Ctrl+Alt+D', _ => {
        mainWindow.webContents.send('capture', app.getPath('pictures'));
    });

    app.on('will-quit', _ => {
        globalShortcut.unregisterAll();
    });

    app.on('close', _ => {
        mainWindow = null;
    })
});

