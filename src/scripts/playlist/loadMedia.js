export default async function loadMedia(path, title){
    players.classList.toggle("load-audio", true)
    localStorage.setItem("tempFunc", 1);
    localStorage.setItem("tempTitle", title);
    localStorage.setItem("tempPath", path);
}