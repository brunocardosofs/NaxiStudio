import Click from "./click.js"
import loadPage from "./pages/pages.js"

const content = document.getElementById("content")

content.innerHTML = `
<div id="side-menu" class="flex-col spc-btw align-center">
    <ul>
        <li page="database">Base de Dados</li>
        <li page="audio">Audio</li>
        <li click="teste">Pastas</li>
        <li>Musical</li>
        <li>Comercial</li>
    </ul>
    <ul>
        <li>Sobre</li>
        <li>Ajuda</li>
        <li>Github</li>
        <li>Site</li>
    </ul>
</div>
<div id="config-page" class="flex-col spc-btw align-center">
    
</div>
`

document.onclick = (e) => {
    if(e.target.getAttribute("click") != (null || undefined)) Click(e.target)
    else if(e.target.getAttribute("page") != (null || undefined)) loadPage(e.target.getAttribute("page"))
}