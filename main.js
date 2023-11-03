const { app, BrowserWindow, Menu, ipcMain } = require("electron")
const path = require("node:path");
const fs = require("fs").promises

var mainWindow

// Create Window
async function createWindow(){
    mainWindow = new BrowserWindow({
        width:1000,
        height:600,
        minWidth:800,
        minHeight:600,
        maximizable: true,
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

async function createWindowConfig(){
    mainWindow = new BrowserWindow({
        width:800,
        height:600,
        minWidth:800,
        minHeight:600,
        maximizable: true,
        icon: __dirname + '/src/assets/playicon.png',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, "./preload.js")
        }
    })

    await mainWindow.loadFile('src/windows/config/index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

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



