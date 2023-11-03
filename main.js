const { app, BrowserWindow, Menu, ipcMain } = require("electron")
const path = require("path"); 

var mainWindow

// Create Window
async function createWindow(){
    mainWindow = new BrowserWindow({
        width:800,
        height:600,
        minWidth:800,
        minHeight:600,
        maximizable: true,
        icon: path.join(__dirname, '/src/assets/playicon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "./preload.js")
        }
    })

    await mainWindow.loadFile('src/pages/player/index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

async function createWindowConfig(){
    mainWindow = new BrowserWindow({
        width:800,
        height:600,
        minWidth:800,
        minHeight:600,
        maximizable: true,
        icon: __dirname + '/src/assets/playicon.png',
    })

    await mainWindow.loadFile('src/pages/config/index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

//OnReady

app.whenReady().then(createWindow);

// ipcMain.on('create-config', createWindowConfig())

ipcMain.handle('openConfig', async () => {
    createWindowConfig()
    return "Foi"
});
