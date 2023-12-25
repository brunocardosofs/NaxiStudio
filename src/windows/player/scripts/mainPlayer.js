if(localStorage.getItem("path-database") == (null || undefined)){
    if (confirm(`O caminho da base de dados não está definido, deseja defini-lo agora?`)){
        await openDatabase()
    }
}

import { openDatabase } from "../../config/scripts/database/database.js"
import { Click } from "./click.js"
import Clock from "./components/clock.js"
import { Hours } from "./components/hours.js"
import { Player, playerEvents } from "./components/player.js"
import { loadPlaylist } from "./playlist/playlist.js"

let content = document.getElementById("content")

content.innerHTML = `
<div id="player-media" class="flex-row spc-btw align-center">
    <div class="hght-240 flex-col spc-btw align-center">
        <div id="players" class="flex-row spc-btw align-center">
            ${Player(0)}
            ${Player(1)}
            ${Player(2)}
        </div>
        <div id="tools" class="flex-row spc-btw align-center">
            <div class="tools-content flex-row align-center">
                <div class="tool-box flex-row align-center" id="calendar-box"><input type="date" id="input-calendar" name="input-calendar" /><input type="button" class="open-calendar" click="open-calendar"></input></div>
                <i class="btn-tools open-config" click="open-config"></i>
                <i class="btn-tools save-playlist" click="save-playlist"></i>
            </div>
            <div class="tools-content flex-row align-center">
                <div class="tool-box" id="clock">${Clock()}</div>
            </div>
        </div>
    </div>
    <div id="commercial">
        
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

//Player Events
playerEvents(0)
playerEvents(1)
playerEvents(2)

// Click
document.onclick = (e) => {if(e.target.getAttribute("click") != (null || undefined)) Click(e.target)}

// Clock Events
setInterval(() => {
    document.getElementById("clock").innerHTML = Clock();
}, 1000)


// Load Playlist Events

var inputCalendar = document.getElementById("input-calendar")
inputCalendar.value = localStorage.getItem("date-playlist")
loadPlaylist(localStorage.getItem("date-playlist"))
inputCalendar.addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        loadPlaylist(e.target.value)
    }else if(parseInt(e.key) >= 0){
        document.getElementById("calendar-box").classList.toggle("orange", true)
        document.getElementById("calendar-box").classList.toggle("red", false)
    }
});

inputCalendar.addEventListener('change', (e) => {
    document.getElementById("calendar-box").classList.toggle("orange", true)
    document.getElementById("calendar-box").classList.toggle("red", false)
});


