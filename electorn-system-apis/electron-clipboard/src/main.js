const electron = require('electron');
const path = require('path');
const MAX_SIZE = 6;
const MAX_LENGTH = 20;

const {app, clipboard, globalShortcut, Tray, Menu} = electron;

app.on('ready', _ => {
    let stack = [];
    const tray = new Tray(path.join('src', 'copy-machine.png'));
    updateTray(tray, stack);
    checkClipboadForChange(clipboard, text => {
        stack = fillStack(stack, text);
        updateTray(tray, stack);
    });
});

app('will-quit', _ => {
    globalShortcut.unregisterAll();
});

function checkClipboadForChange(clipboard, onChange) {
    let cache = clipboard.readText();
    setInterval(_ => {
        let latest = clipboard.readText();
        if (latest !== cache) {
            cache = latest;
            onChange(cache);
        }
    }, 1000)
}

function fillStack(stack, text) {

    return [text, ...stack.filter(x => x != text)].slice(0, Math.min(MAX_SIZE, stack.length + 1));
}

function updateTray(tray, stack) {
    tray.setContextMenu(Menu.buildFromTemplate(
        stack.length ?
            stack.map((item, i)=> {
                return {
                    label: item.trim().length < MAX_LENGTH ? item.trim() : `${item.trim().substring(0, MAX_LENGTH)}...`,
                    click: _ => clipboard.writeText(item),
                    accelerator: `CmdOrCtrl+Alt+${i + 1}`
                }
            }) :
            [
                {
                    label: 'brak',
                    enabled: false
                }
            ]));
    registerShortcuts(globalShortcut, clipboard, stack);
}

function registerShortcuts(globalShortcut, clipboard, stack) {
    globalShortcut.unregisterAll();
    stack.forEach((item, i) => {
        globalShortcut.register(`CmdOrCtrl+Alt+${i+1}`, _ => clipboard.writeText(item));
    });
}