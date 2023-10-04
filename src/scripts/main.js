import loadMedia from "./playlist/loadMedia.js";
import loadPlaylist from "./playlist/loadPlaylist.js";
import loadPlayer from "./playlist/loadPlayer.js";
import loadFolders from "./acervo/loadFolders.js"
import loadFiles from "./acervo/loadFiles.js";

var pathDatabase = "C:/Users/bruno/OneDrive/Documentos/NaxiStudio_Database"

var directory = document.getElementById("directory")
var players = document.getElementById("players")

document.onclick = function(e) {
    if (e.target.className == 'item-list') {
        loadMedia(e.target.getAttribute("local"), e.target.getAttribute("title"))
    }else if(e.target.className == 'hour'){
        loadPlaylist(directory.value, e.target.getAttribute("id"));
    }else if(e.target.className == 'player' && localStorage.getItem("tempFunc") == 1){
        loadPlayer(parseInt(e.target.getAttribute("id")))
    }else if(e.target.className == 'file-collection'){
        loadFiles(e.target.innerHTML, e.target.getAttribute("path"))
    }
}

window.addEventListener("load", () => {
    loadFolders(pathDatabase)
})