export default function loadPage(page){
    let configPage = document.getElementById("config-page")

    switch(page){
        case "database":
            configPage.innerHTML = database()
            break
        case "audio":
            configPage.innerHTML = audio()
            break
    }
}

export function database(){
    let database = localStorage.getItem("path-database")
    console.log(database)

    return `
        <span>${(database != (null || undefined) ? database : "Não definido")}</span><button click="openDatabase">Change</button>
    `
}

export function audio(){
    return `
        <h1>Audio</h1>
    `
}