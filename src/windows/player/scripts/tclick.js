import { loadHourPlaylist, loadPlaylist, savePlaylist } from "./playlist/playlist.js"

export function Click(e){
    switch(e.getAttribute("click")){
        case "open-config":
            window.api.invoke('openConfig').finally(console.log("cabô"))
            break
        case "save-playlist":
            savePlaylist()
            break
        case "open-calendar":
            loadPlaylist(document.getElementById("input-calendar").value)
            break
        case "hour":
            loadHourPlaylist(e.getAttribute("hour"))
            break
    }
}