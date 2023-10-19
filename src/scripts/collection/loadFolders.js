const { readTextFile } = window.__TAURI__.fs;

var collection = document.getElementById("collection")

export default async function loadFolders(pathDatabase){
    let vinheta = document.createElement("ul")
    let music = document.createElement("ul")
    let other = document.createElement("ul")
    let file

    vinheta.innerHTML = "<li class='title-collection'>Vinhetas</li>"
    music.innerHTML = "<li class='title-collection'>Músicas</li>"
    other.innerHTML = "<li class='title-collection'>Outros</li>"
    collection.innerHTML = ""

    const folders = JSON.parse(await readTextFile(pathDatabase + '/collection/folders.json'));

    folders.forEach((element) => {
        file = document.createElement("li")
        file.innerText = element.title
        file.setAttribute("path", element.path)
        file.classList.toggle("file-collection", true)
        switch(element.type){
            case "vinheta":
                vinheta.append(file)
                break
            case "music":
                music.append(file)
                break
            default:
                other.append(file)
                break
        }
    });

    collection.append(vinheta, music, other)
}