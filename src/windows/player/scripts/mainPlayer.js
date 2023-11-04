import { Click } from "./click.js"
import Clock from "./components/Clock.js"
import { Hours } from "./components/Hours.js"
import { Player } from "./components/player.js"
import { loadPlaylist } from "./playlist/Playlist.js"

const content = document.getElementById("content")

content.innerHTML = `
<div id="player-media" class="flex-row spc-btw align-center">
    <div class="hght-240 flex-col spc-btw align-center">
        <div id="players" class="flex-row spc-btw align-center">
            ${Player(0)}
            ${Player(0)}
            ${Player(0)}
        </div>
        <div id="tools" class="flex-row spc-btw align-center">
            <div class="tools-content flex-row align-center">
                <div class="tool-box flex-row align-center"><i class="open-calendar" click="open-calendar"></i><input type="date" id="input-calendar" name="input-calendar" /></div>
                <i class="btn-tools open-config" click="open-config"></i>
                <i class="btn-tools save-playlist" click="save-playlist"></i>
            </div>
            <div class="tools-content flex-row align-center">
                <div class="tool-box" id="clock">00/00/0000 00:00:00</div>
            </div>
        </div>
    </div>
    <div id="commercial">
        Commercial
    </div>
</div>

<div id="list-media" class="flex-row spc-btw align-center">
    <div id="playlist" class="flex-col spc-btw align-center">
        <ul id="hours" class="flex-row spc-btw align-center">
            ${Hours()}
        </ul>
        <div id="playlist-area" class="flex-row spc-btw align-center">
            <ul id="list" class="grid"></ul>
            <div id="playlist-tools"></div>
        </div>
    </div>
    <div id="medias">
        <div id="collection"></div>
    </div>
</div>
`

document.onclick = (e) => {if(e.target.getAttribute("click") != null) Click(e.target)}

var inputCalendar = document.getElementById("input-calendar")

inputCalendar.onchange = (e) => loadPlaylist(e.target.value)

localStorage.getItem("path-playlist")

switch(localStorage.getItem("date-playlist")){
    case "standard":
        loadPlaylist("standard")
        break
    case (null || undefined):
        break
    default:
        inputCalendar.value = localStorage.getItem("date-playlist")
        loadPlaylist(localStorage.getItem("date-playlist"))
}

document.getElementById("clock").innerHTML = Clock();
setInterval(() => {
    document.getElementById("clock").innerHTML = Clock();
}, 1000)