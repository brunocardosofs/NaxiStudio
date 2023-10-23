import configDatabase from "./base/configDatabase.js";
import { pageAudio, changeAudio } from "./pages/pageAudio.js";

let dirDatabasePath = localStorage.getItem("database-path")

var config = document.getElementById("config")

console.log(dirDatabasePath)

if(dirDatabasePath == null){
    for(; dirDatabasePath == null;)
    dirDatabasePath = await configDatabase();
    localStorage.setItem("database-path", dirDatabasePath)
}

document.onchange = (e) => {
    switch(e.target.className){
        case "audio-output":
            changeAudio(e.target.id, e.target.value)
            break
    }
}

document.onclick = (e) => {
    
}

config.innerHTML = await pageAudio()