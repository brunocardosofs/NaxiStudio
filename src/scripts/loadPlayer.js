var audio = document.querySelectorAll(".audio-player")
var players = document.getElementById("player")

export default function loadPlayer(id){
    localStorage.setItem("tempFunc", 0)
    players.classList.remove("load-audio")
    let apiPath = window.__TAURI__.tauri.convertFileSrc(localStorage.getItem("tempPath"))
    audio[id].src = apiPath
    audio[id].load()
}