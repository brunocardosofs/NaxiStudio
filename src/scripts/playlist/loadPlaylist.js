const { readDir, readTextFile, writeTextFile } = window.__TAURI__.fs;

var playlist = document.getElementById("list")
var file

var dir = localStorage.getItem("database-path")
var grid = JSON.parse(await readTextFile(dir + "/musical/grid/standard.json"))

var title;
var path;

export async function loadPlaylist(){
    playlist.innerHTML = "";
    grid["00"].forEach((e, i) => {
        file = document.createElement("li")
        file.innerText = e[0]
        file.setAttribute("title", e[0])
        file.setAttribute("local", e[1])
        file.setAttribute("indice", i)
        file.classList.toggle("item-playlist", true)
        playlist.append(file)
    });
}

export async function addPlaylist(n){
    localStorage.setItem("tempFunc", 0)
    title = localStorage.getItem("tempTitle")
    path = localStorage.getItem("tempPath")
    var exist = false;
    let existI;

    grid["00"].forEach((e, i) => {
        if(path == e[1]){
            exist = true
            existI = i
        }
    });

    if(exist) grid["00"].splice(existI, 1)

    if(n >= 0){
        grid["00"].splice(n, 0, [title, path])
    }else if(exist){
        grid["00"].splice(existI, 0, [title, path])
    }else{
        grid["00"].push([title, path])
    }

    loadPlaylist()
    //console.log(grid)
}

export async function savePlaylist(){
    await writeTextFile(dir + "/musical/grid/standard.json", JSON.stringify(grid))
    console.log("Salvo")
}
