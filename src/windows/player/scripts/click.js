import { loadPlayer, playerPause, playerPlay, playerStop } from "./components/player.js"
import { clickMediaPlaylist, loadMediaPlayer } from "./playlist/media.js"
import { loadHourPlaylist, loadPlaylist, savePlaylist } from "./playlist/playlist.js"

export function Click(e){
    switch(e.getAttribute("click")){
        case "prog-play":
            playerPlay(e.getAttribute("player"))
            break
        case "prog-pause":
            playerPause(e.getAttribute("player"))
            break
        case "prog-stop":
            playerStop(e.getAttribute("player"))
            break
        case "open-config":
            window.api.invoke('openConfig').catch((e) => alert("Erro ao abrir configurações \n Error: " + e))
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
        case "load-media":
            clickMediaPlaylist(e)
            break
        case "load-media-player":
            loadMediaPlayer(parseInt(e.getAttribute("player")))
            break
    }
}