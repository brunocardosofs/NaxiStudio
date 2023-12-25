import { openDatabase } from "./database/database.js"
import loadPage from "./pages/pages.js"

export default async function Click(e){
    switch(e.getAttribute("click")){
        case "openDatabase":
            await openDatabase()
            loadPage("database")
            break
    }
}