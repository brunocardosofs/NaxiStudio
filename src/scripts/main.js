const { WebviewWindow  } = window.__TAURI__.window;

import loadMedia from "./playlist/loadMedia.js";
import loadPlayer from "./playlist/loadPlayer.js";
import loadFolders from "./collection/loadFolders.js"
import loadFiles from "./collection/loadFiles.js";

var pathDatabase = localStorage.getItem("database-path")

document.onclick = (e) => {
    switch(e.target.className){
        case 'item-list':
            loadMedia(e.target.getAttribute("local"), e.target.getAttribute("title"))
            break
        case 'load-folders':
            loadFolders(pathDatabase)
            break
        case 'player':
            if(localStorage.getItem("tempFunc") == 1){
                loadPlayer(parseInt(e.target.getAttribute("id")))
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
    }
}

window.addEventListener("load", () => {
    loadFolders(pathDatabase)
})