export function Hours(id){
    var html = ""

    for(var i=0; i<=23; i++){
        html = html + `\n<li class="hour" hour="${(i<10) ? "0"+i : i}" click="hour">${(i<10) ? "0"+i : i}</li>`
    }

    return `
        ${html}
    `
}