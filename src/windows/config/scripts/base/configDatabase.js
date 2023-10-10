const { writeTextFile, exists, createDir } = window.__TAURI__.fs;
const { open } = window.__TAURI__.dialog;

export default async function configDatabase(){
    const dirDatabase = await open({
        directory: true,
        multiple: false
    });
    
    if(dirDatabase != null){
        var configFile = dirDatabase + "/config/app.json"
        var foldersFile = dirDatabase + "/collection/folders.json"

        if(!(await exists(configFile))){
            try{
                await createDir(dirDatabase + "/config")
            }catch(e){
                console.log(e)
            }finally{
                await writeTextFile(configFile, '{}');
            }
        }

        if(!(await exists(foldersFile))){
            try{
                await createDir(dirDatabase + "/collection");
            }catch(e){
                console.log(e)
            }finally{
                await writeTextFile(foldersFile, '[]');
            }
        }
    }

    return dirDatabase
}