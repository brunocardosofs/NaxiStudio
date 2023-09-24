const { readDir, readFile, BaseDirectory } = window.__TAURI__.fs;

var playlist = document.getElementById("list")
var liPlaylist

function getFileExtension1(filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
}

export default async function loadPlaylist(dir, func){
    const entries = await readDir(dir, {
        dir: BaseDirectory.App,
        recursive: true
    });

    if(func == "h01"){playlist.innerHTML = ""};

    for(var i=0;i<entries.length;i++){
        if(getFileExtension1(entries[i].path) == "mp3"){
            liPlaylist = document.createElement("li");
            liPlaylist.innerHTML = entries[i].name
            liPlaylist.setAttribute("local", entries[i].path)
            liPlaylist.setAttribute("title", entries[i].name)
            liPlaylist.classList.add("item-list")
            playlist.append(liPlaylist)
        }
    }
}