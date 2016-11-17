const electron = require('electron');

const ipc = electron.ipcRenderer;

module.exports = function($btn, $textbox) {
    $btn.addEventListener('click', e => {
        ipc.send('counter-start');
    });

    ipc.on('counter-update', (sender, e)=> {
        console.log(e);
        $textbox.innerText = e;
    });
};