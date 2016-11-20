const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const Dialog = electron.dialog;

app.on('ready', _ => {
    let mainWindow = new BrowserWindow({
        height: 400,
        width: 400
    });

    let name = electron.app.getName();
    const template = [
        {
            label: name,// bierze z package json productName,
            submenu: [
                {
                    label: `O ${name}`,
                    click: _ => Dialog.showMessageBox({
                        title: `O ${name}`,
                        buttons: ['Ok'],
                        message: `${name} to super aplikacja \n deal with it.`
                    })
                }, {
                    role: 'about' // wbudowany about
                }, {
                    role: 'togglefullscreen',
                    accelerator: 'CmdOrCtrl+f'
                }, {
                    type: 'separator'
                }, {
                    label: 'Zamknij',
                    click: _ => app.quit(),
                    accelerator: 'CmdOrCtrl+z' // skrot klawiszowy tak dla demonstracji bo q zawsze dziala
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);
});