const { WebviewWindow  } = window.__TAURI__.window;
const { register, unregisterAll } = window.__TAURI__.globalShortcut;

import loadMedia from "./playlist/loadMedia.js";
import loadPlayer from "./playlist/loadPlayer.js";
import loadFolders from "./collection/loadFolders.js"
import loadFiles from "./collection/loadFiles.js";
import { loadPlaylist, addPlaylist, savePlaylist } from "./playlist/loadPlaylist.js";

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

loadFolders(pathDatabase)

loadPlaylist(pathDatabase)


await unregisterAll();

// await register('F3', () => {
//     console.log('Shortcut triggered');
// });