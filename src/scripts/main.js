const { WebviewWindow  } = window.__TAURI__.window;
const { register, registerAll, unregisterAll } = window.__TAURI__.globalShortcut;

import loadMedia from "./playlist/loadMedia.js";
import loadPlayer from "./playlist/loadPlayer.js";
import loadFolders from "./collection/loadFolders.js"
import loadFiles from "./collection/loadFiles.js";
import { loadPlaylist, addPlaylist, removePlaylist, savePlaylist } from "./playlist/loadPlaylist.js";

var pathDatabase = localStorage.getItem("database-path")

document.onclick = (e) => {
    switch(e.target.className){
        case 'item-list':
            loadMedia(e.target.getAttribute("local"), e.target.getAttribute("title"))
            break
        case 'item-playlist':
            if(localStorage.getItem("tempFunc") == 1){
                addPlaylist(parseInt(e.target.getAttribute("indice")))
            }else{
                loadMedia(e.target.getAttribute("local"), e.target.getAttribute("title"))
            }
            break
        case 'load-folders':
            loadFolders(pathDatabase)
            break
        case 'player':
            if(localStorage.getItem("tempFunc") == 1){
                loadPlayer(parseInt(e.target.getAttribute("id")))
                addPlaylist(-1)
            }
            break
        case 'grid':
            if(localStorage.getItem("tempFunc") == 1){
                addPlaylist()
            }
            break
        case 'file-collection':
            loadFiles(e.target.innerHTML, e.target.getAttribute("path"))
            break
        case 'open-config':
            const webview = new WebviewWindow('NaxiStudioConfig', {
                title: "NaxiStudio Config",
                url: '../windows/config/index.html',
                minWidth: 800,
                minHeight: 600,
                center: true
            })
            break
        case 'save-playlist':
            savePlaylist()
            break
    }
}

document.oncontextmenu = (e) => {
    switch(e.target.className){
        case 'item-playlist':
            e.preventDefault();
            removePlaylist(parseInt(e.target.getAttribute("indice")))
    }
}

loadFolders(pathDatabase)

loadPlaylist()


// await unregisterAll();

// await register('F12', (e) => {
//     console.log('Shortcut triggered', e);
// });

// await registerAll(['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11'], (e) => {
//     console.log(`Shortcut ${e} triggered`);
// });