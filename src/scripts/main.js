const { WebviewWindow  } = window.__TAURI__.window;
const { register, registerAll, unregisterAll } = window.__TAURI__.globalShortcut;

import loadMedia from "./playlist/loadMedia.js";
import { loadPlayer, pausePlayer, playPlayer, stopPlayer } from "./playlist/funcsPlayer.js";
import loadFolders from "./collection/loadFolders.js"
import loadFiles from "./collection/loadFiles.js";
import { loadPlaylist, addPlaylist, removePlaylist, savePlaylist } from "./playlist/loadPlaylist.js";
import Player from "./components/Player.js";

var pathDatabase = localStorage.getItem("database-path")
var players = document.getElementById("players")

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
        case 'overlay':
            if(localStorage.getItem("tempFunc") == 1){
                loadPlayer(e.target.getAttribute("player"))
                addPlaylist(-1)
            }
            break
        case 'btn-player btn-play':
            playPlayer(e.target.getAttribute("player"))
            break
        case 'btn-player btn-pause':
            pausePlayer(e.target.getAttribute("player"))
            break
        case 'btn-player btn-stop':
            stopPlayer(e.target.getAttribute("player"))
            break
        case 'grid':
            if(localStorage.getItem("tempFunc") == 1){
                addPlaylist()
            }
            break
        case 'file-collection':
            loadFiles(e.target.innerHTML, e.target.getAttribute("path"))
            break
        case 'btn-tools open-config':
            const webview = new WebviewWindow('NaxiStudioConfig', {
                title: "NaxiStudio Config",
                url: '../windows/config/index.html',
                minWidth: 800,
                minHeight: 600,
                center: true
            })
            break
        case 'btn-tools save-playlist':
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

players.innerHTML = `
    ${Player(0)}
    ${Player(1)}
    ${Player(2)}
`


// await unregisterAll();

// await register('F12', (e) => {
//     console.log('Shortcut triggered', e);
// });

// await registerAll(['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11'], (e) => {
//     console.log(`Shortcut ${e} triggered`);
// });