const electron = require('electron');
const path = require('path');
const app = electron.app;
const Tray = electron.Tray;
const Menu = electron.Menu;


app.on('ready', _ => {
    var tray = new Tray(path.join('src', 'piggy-bank.png'));
    const menu = Menu.buildFromTemplate([{
        label: "Czadowa świnia",
        role: 'about'
    }, {
        label: 'Zamknij',
        role: 'quit'
    }]);
    tray.setContextMenu(menu);
    tray.setToolTip("no kliknij");
});