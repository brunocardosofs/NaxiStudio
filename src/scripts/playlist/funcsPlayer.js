export function loadPlayer(id){
    let audio = document.querySelector(`#audiotag${id}`)
    let title = document.querySelector(`#player${id} .title-player`)
    localStorage.setItem("tempFunc", 0)
    players.classList.toggle("load-audio", false)
    let apiPath = window.__TAURI__.tauri.convertFileSrc(localStorage.getItem("tempPath"))
    title.innerHTML = localStorage.getItem("tempTitle")
    audio.src = apiPath
    audio.load()
}

export function playPlayer(id){
    let audio = document.querySelector(`#audiotag${id}`)
    audio.play()
}

export function pausePlayer(id){
    let audio = document.querySelector(`#audiotag${id}`)
    audio.pause()
}

export function stopPlayer(id){
    let audio = document.querySelector(`#audiotag${id}`)
    audio.pause()
}