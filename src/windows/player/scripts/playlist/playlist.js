import standardMusical from "./standards/musical.js"

var database = localStorage.getItem("path-database")
var grid

var playlist = document.getElementById("list")
var file


// Load playlist
export async function loadPlaylist(date){
    let calendarBox = document.getElementById("calendar-box")
    let path = database + `/musical/grid/${date}.json`
    await window.api.files('readJsonFile', path).then((res) => {
        grid = JSON.parse(res)
        loadHourPlaylist("00")
        localStorage.setItem("path-playlist", path)
        localStorage.setItem("date-playlist", date)
        calendarBox.classList.toggle("orange", false)
        calendarBox.classList.toggle("red", false)
    })
    .catch((err) => {
        console.log("error:", err)
        if (confirm(`Nenhum arquivo de programação encontrado para ${date}, você deseja criar o arquivo de programação desse dia?`)) {
            writePlaylistFile(path, date)
          } else {
            calendarBox.classList.toggle("orange", false)
            calendarBox.classList.toggle("red", true)
          }
    })
}

export async function writePlaylistFile(path, date){
    window.api.files('writeJsonFile', path, JSON.stringify(standardMusical)).then((res) => {
        loadPlaylist(date)
    }).catch((err) => console.log("error", err))
}

export async function loadHourPlaylist(hour){
    let hourElement = document.querySelectorAll(".hour")

    playlist = document.getElementById("list")
    playlist.innerHTML = ""
    grid[hour].map((e, i) => {
        file = document.createElement("li")
        file.innerText = e[0]
        file.setAttribute("title", e[0])
        file.setAttribute("path", e[1])
        file.setAttribute("click", "load-media")
        file.setAttribute("id", i)
        file.classList.toggle("item-playlist", true)
        playlist.append(file)
    });

    hourElement.forEach((e, i) => {
        if(i == hour){
            e.classList.toggle("active", true)
        }else{
            e.classList.toggle("active", false)
        }
    })
}

export function savePlaylist(){
    window.api.files('writeJsonFile', localStorage.getItem("path-playlist"), JSON.stringify(grade)).then((res) => console.log(res))
}