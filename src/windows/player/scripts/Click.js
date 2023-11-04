import { loadHourPlaylist, savePlaylist } from "./playlist/Playlist.js"

export function Click(e){
    switch(e.getAttribute("click")){
        case "open-config":
            window.api.invoke('openConfig').finally(console.log("cabô"))
            break
        case "save-playlist":
            savePlaylist()
            break
        case "hour":
            loadHourPlaylist(e.getAttribute("hour"))
            break
    }
}