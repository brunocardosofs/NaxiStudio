import { timeMath } from "../math/math.js"

export function Player(id){
    return `
    <div class="player flex-col spc-evnl align-center ${id}">
        <div class="overlay off" player="${id}"></div>
        <div class="flex-row spc-evnl align-center controls-player" player="${id}">
            <button class="btn-player btn-play" click="prog-play" player="${id}"></button>
            <button class="btn-player btn-pause" click="prog-pause" player="${id}"></button>
            <button class="btn-player btn-stop" click="prog-stop" player="${id}"></button>
        </div>
        <div class="infos-player flex-col align-center">
            <span title="Teste" class="title-player">Título</span>
            <span class="time-bar"><i class="current-bar" style="transform: scaleX(0)"></i></span>
            <div class="times-player flex-row spc-btw align-center">
                <span class="time-left">00:00:00</span>
                <span class="total-time">00:00:00</span>
            </div>
        </div>
        <audio class="audio-player" id="audiotag${id}" src="#"></audio>
    </div>
    `
}

export function loadPlayer(id, src){
    let audioTag = document.getElementById(`audiotag${id}`)
    audioTag.src = src
}

export function playerPlay(id){
    let audioTag = document.getElementById(`audiotag${id}`)
    audioTag.play()
}

export function playerPause(id){
    let audioTag = document.getElementById(`audiotag${id}`)
    audioTag.pause()
}

export function playerStop(id){
    let audioTag = document.getElementById(`audiotag${id}`)
    audioTag.pause()
    audioTag.currentTime = 0
}

export function playerEvents(id){
    let audioTag = document.getElementById(`audiotag${id}`)
    let timeLeft = document.getElementsByClassName("time-left")
    let timeTotal = document.getElementsByClassName("total-time")
    let currentBar = document.getElementsByClassName("current-bar")

    audioTag.ontimeupdate = () => {
        timeLeft[id].innerHTML = timeMath(audioTag.currentTime)
        currentBar[id].setAttribute("style", `transform: scaleX(${(audioTag.duration > 0) ? (audioTag.currentTime/audioTag.duration): 0})`)
    }

    audioTag.ondurationchange = () => {
        timeTotal[id].innerHTML = timeMath(audioTag.duration)
    }
}