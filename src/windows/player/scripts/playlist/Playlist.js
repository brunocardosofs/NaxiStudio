localStorage.setItem("path-database", "C:/Users/bruno/OneDrive/Documentos/NaxiStudio_Database")

var database = localStorage.getItem("path-database")
var grid

var playlist = document.getElementById("list")
var file

export async function loadPlaylist(date){
    let path = database + `/musical/grid/${date}.json`
    localStorage.setItem("path-playlist", path)
    localStorage.setItem("date-playlist", date)
    await window.api.files('readJsonFile', path).then((res) => {
        grid = JSON.parse(res)
        document.querySelectorAll(".hour")[0].classList.toggle("active", true)
        loadHourPlaylist("00")
    })
    .catch((err) => {
        loadPlaylist("standard")
        document.getElementById("input-calendar").value = ""
    })
}

export async function loadHourPlaylist(hour){
    playlist = document.getElementById("list")
    playlist.innerHTML = ""
    grid[hour].forEach((e, i) => {
        file = document.createElement("li")
        file.innerText = e[0]
        file.setAttribute("title", e[0])
        file.setAttribute("local", e[1])
        file.setAttribute("indice", i)
        file.classList.toggle("item-playlist", true)
        playlist.append(file)
    });
    document.querySelector(".active").classList.toggle("active", false)
    document.querySelectorAll(".hour")[parseInt(hour)].classList.toggle("active", true)
}

export function savePlaylist(){
    window.api.files('writeJsonFile', localStorage.getItem("path-playlist"), JSON.stringify(grade)).then((res) => console.log(res))
}