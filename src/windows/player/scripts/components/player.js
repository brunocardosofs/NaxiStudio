export function Player(id){
    return `
    <div class="player flex-col spc-evnl align-center ${id}">
        <div class="overlay" player="${id}"></div>
        <div class="controls-player" player="${id}">
            <button class="btn-player btn-play" player="${id}"></button>
            <button class="btn-player btn-pause" player="${id}"></button>
            <button class="btn-player btn-stop" player="${id}"></button>
        </div>
        <div class="infos-player ${id}">
            <span title="Teste" class="title-player">Título</span>
            <span class="time-bar">bar</span>
            <div class="times-player">
                <span class="total-time">00:00:00</span>
                <span class="time-left">00:00:00</span>
            </div>
        </div>
        <audio class="audio-player" id="audiotag${id}" src="#"></audio>
    </div>
    `
}