import configDatabase from "./base/configDatabase.js";

let dirDatabasePath = localStorage.getItem("database-path")

console.log(dirDatabasePath)

if(dirDatabasePath == null){
    for(; dirDatabasePath == null;)
    dirDatabasePath = await configDatabase();
    localStorage.setItem("database-path", dirDatabasePath)
}