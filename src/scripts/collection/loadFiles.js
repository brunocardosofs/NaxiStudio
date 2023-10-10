const { readDir } = window.__TAURI__.fs;

var collection = document.getElementById("collection")
var file

function getFileExtension(filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
}

export default async function loadFiles(title, path){
    collection.innerHTML = `<li class='load-folders'>${title}</li>`

    const entries = await readDir(path)
    console.log(entries.length)

    entries.forEach((e) => {
        if(getFileExtension(e.path) == ("mp3" || "aac" || "opus" || "wav")){
            file = document.createElement("li")
            file.innerText = e.name
            file.setAttribute("local", e.path)
            file.setAttribute("title", e.name)
            file.classList.toggle("item-list", true)
            collection.append(file)
        }
    });
}