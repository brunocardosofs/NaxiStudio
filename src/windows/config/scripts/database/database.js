export async function openDatabase(){
    await window.api.files("openDialogFolder").then(res => localStorage.setItem("path-database", res))
}