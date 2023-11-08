import { timeMath } from "../math/math.js"

export function Player(id){
    return `
    <div class="player flex-col spc-evnl align-center ${id}">
        <div class="overlay off" player="${id}"></div>
        <div class="flex-row spc-evnl align-center controls-player" player="${id}">
            <button class="btn-player btn-play" player="${id}"></button>
            <button class="btn-player btn-pause" player="${id}"></button>
            <button class="btn-player btn-stop" player="${id}"></button>
        </div>
        <div class="infos-player flex-col align-center">
            <span title="Teste" class="title-player">Título</span>
            <span class="time-bar"><span class="current-bar"></span></span>
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
    audioTag.play()
}

export function playerEvents(id){
    let audioTag = document.getElementById(`audiotag${id}`)
    let timeLeft = document.getElementsByClassName("time-left")
    let timeTotal = document.getElementsByClassName("total-time")
    let currentBar = document.getElementsByClassName("current-bar")

    audioTag.ontimeupdate = () => {
        timeLeft[id].innerHTML = timeMath(audioTag.currentTime)
        currentBar[id].setAttribute("style", `width: ${(audioTag.currentTime/audioTag.duration)*100}%`)
    }

    audioTag.ondurationchange = () => {
        timeTotal[id].innerHTML = timeMath(audioTag.duration)
    }
}