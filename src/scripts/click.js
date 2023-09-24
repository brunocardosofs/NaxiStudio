import loadMedia from "./loadMedia.js";
import loadPlaylist from "./loadPlaylist.js";
import loadPlayer from "./loadPlayer.js";

var directory = document.getElementById("directory")

document.onclick = function(e) {
    if (e.target.className == 'item-list') {
        loadMedia(e.target.getAttribute("local"), e.target.getAttribute("title"))
    }else if(e.target.className == 'hour'){
        loadPlaylist(directory.value, e.target.getAttribute("id"));
    }else if(e.target.className == 'player' && localStorage.getItem("tempFunc") == 1){
        loadPlayer(parseInt(e.target.getAttribute("id")))
    }
}