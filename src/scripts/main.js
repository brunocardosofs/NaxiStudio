import loadMedia from "./playlist/loadMedia.js";
import loadPlaylist from "./playlist/loadPlaylist.js";
import loadPlayer from "./playlist/loadPlayer.js";
import loadFolders from "./collection/loadFolders.js"
import loadFiles from "./collection/loadFiles.js";

var pathDatabase = localStorage.getItem("database-path")

const { WebviewWindow  } = window.__TAURI__.window;

var directory = document.getElementById("directory")
var players = document.getElementById("players")

document.onclick = function(e) {
    if (e.target.className == 'item-list') {
        loadMedia(e.target.getAttribute("local"), e.target.getAttribute("title"))
    }else if(e.target.className == 'load-folders'){
        loadFolders(pathDatabase)
    }else if(e.target.className == 'player' && localStorage.getItem("tempFunc") == 1){
        loadPlayer(parseInt(e.target.getAttribute("id")))
    }else if(e.target.className == 'file-collection'){
        loadFiles(e.target.innerHTML, e.target.getAttribute("path"))
    }else if(e.target.className == 'open-config'){
        const webview = new WebviewWindow('NaxiStudioConfig', {
            title: "NaxiStudio Config",
            url: '../windows/config/index.html',
        })
    }
}

window.addEventListener("load", () => {
    loadFolders(pathDatabase)
})