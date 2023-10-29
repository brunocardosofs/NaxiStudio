export default function Player(id){

    return `
    <div class="player" id="player${id}">
        <div class="overlay" player="${id}"></div>
        <div class="controls-player ${id}">
            <button class="btn-player btn-play" player="${id}"></button>
            <button class="btn-player btn-pause" player="${id}"></button>
            <button class="btn-player btn-stop" player="${id}"></button>
        </div>
        <div class="infos-player">
        <span class="title-player">Título</span>
        <span class="time-bar">bar</span>
        <div class="times-player">
            <span class="total-time">00:00</span>
            <span class="time-left">00:00</span>
        </div>
        </div>
        <audio class="audio-player" controls id="audiotag${id}" src="#"></audio>
    </div>
    `
}