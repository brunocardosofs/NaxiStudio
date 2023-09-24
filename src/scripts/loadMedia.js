var players = document.getElementById("player")

export default async function loadMedia(path, title){
    players.classList.add("load-audio")
    localStorage.setItem("tempFunc", 1);
    localStorage.setItem("tempTitle", title);
    localStorage.setItem("tempPath", path);
}