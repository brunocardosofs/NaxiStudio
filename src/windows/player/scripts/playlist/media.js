export function clickMediaPlaylist(target){
    let title = target.getAttribute("title")
    let path = target.getAttribute("path")

    localStorage.setItem("media-title", title)
    localStorage.setItem("media-path", path)

    waitMediaPlayer()
}

function waitMediaPlayer(){
    let overlay = document.getElementsByClassName("overlay")
    for(let i = 0; i<=2; i++){
        let audio = document.getElementById(`audiotag${i}`)
        if(audio.paused){
            overlay[i].classList.toggle("off", false)
            overlay[i].classList.toggle("on", true)
        }
    }
}

export function loadMediaPlayer(id){
    let overlay = document.getElementsByClassName("overlay")
    let titleTag = document.getElementsByClassName("title-player")[id]
    let title = localStorage.getItem("media-title")
    let path = localStorage.getItem("media-path")

    let audioTag = document.getElementById(`audiotag${id}`)

    audioTag.src = path
    titleTag.innerHTML = title
    titleTag.setAttribute("title", title)

    console.log(title, path)

    for(let i = 0; i<=2; i++){
        overlay[i].classList.toggle("off", true)
        overlay[i].classList.toggle("on", false)
    }
}