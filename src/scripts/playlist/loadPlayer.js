var audio = document.querySelectorAll(".audio-player")

export default function loadPlayer(id){
    localStorage.setItem("tempFunc", 0)
    players.classList.toggle("load-audio", false)
    let apiPath = window.__TAURI__.tauri.convertFileSrc(localStorage.getItem("tempPath"))
    audio[id].src = apiPath
    audio[id].load()
}