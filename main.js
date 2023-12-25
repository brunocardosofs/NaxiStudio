const { app, BrowserWindow, Menu, ipcMain, powerSaveBlocker, dialog } = require("electron")
const path = require("node:path");
const fs = require("fs").promises

var mainWindow
var configWindow

// Create Main Window
async function createWindow(){
    mainWindow = new BrowserWindow({
        width:1000,
        height:600,
        minWidth:850,
        minHeight:600,
        maximizable: true,
        backgroundColor: "#2D3340",
        icon: path.join(__dirname, '/src/assets/playicon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, "./preload.js")
        }
    })

    await mainWindow.loadFile('src/windows/player/index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

// Create Config Window
async function createWindowConfig(){
    configWindow = new BrowserWindow({
        width:800,
        height:600,
        minWidth:800,
        minHeight:600,
        maximizable: true,
        backgroundColor: "#2D3340",
        icon: __dirname + '/src/assets/playicon.png',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, "./preload.js")
        },
    })

    await configWindow.loadFile('src/windows/config/index.html');

    configWindow.once('ready-to-show', () => {
        configWindow.show()
    });
}

// Block the system from entering low-power (sleep) mode.
const idPowerSaveBlocker = powerSaveBlocker.start('prevent-display-sleep')
// console.log(powerSaveBlocker.isStarted(idPowerSaveBlocker))
// powerSaveBlocker.stop(idPowerSaveBlocker)
// console.log(powerSaveBlocker.isStarted(idPowerSaveBlocker))

// Remove Menu
// Menu.setApplicationMenu(null)

// OnReady
app.whenReady().then(createWindow);

// Open Config Window
ipcMain.handle('openConfig', async () => {
    createWindowConfig()
});


// List audio files in a folder
ipcMain.handle('loadFiles', async (channel, dir) => {
    let files = []
    let list = await fs.readdir(dir)
    
    list.forEach(element => {
        if(path.extname(element) == (".mp3" || ".aac" || ".opus" || ".wav" || ".flac")){
            files.push({"path": dir + "/" + element, "title": element, "dir": dir})
        }
    });

    return files
});


// Read JSON file
ipcMain.handle('readJsonFile', async (channel, path) => {
    let file = await fs.readFile(path, 'utf8', (err, data) => {
        if (err) throw err
        return data
    })
    
    return file
});

ipcMain.handle('writeJsonFile', async (channel, path, data) => {
    fs.writeFile(path, data, 'utf8', (err) => console.log(err));
    return "foi"
});

ipcMain.handle('openDialogFolder', async (channel) => {
    let path = dialog.showOpenDialogSync(configWindow, {properties: ['openDirectory']})
    console.log(path[0])
    
    return path[0]
});
