import { loadPlayer, playerPause, playerPlay, playerStop } from "./components/player.js"
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
            window.api.invoke('openConfig').finally(console.log("cabô"))
            break
        case "save-playlist":
            //savePlaylist()
            loadPlayer(1, "C:/Arquivos/MEDIA/MÚSICAS/Sertanejo/Marília Mendonça - Morango do Nordeste.mp3")
            break
        case "open-calendar":
            loadPlaylist(document.getElementById("input-calendar").value)
            break
        case "hour":
            loadHourPlaylist(e.getAttribute("hour"))
            break
    }
}