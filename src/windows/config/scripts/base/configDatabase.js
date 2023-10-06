const { readTextFile, writeTextFile, exists } = window.__TAURI__.fs;
const { open } = window.__TAURI__.dialog;

export default async function configDatabase(){
    const dirDatabase = await open({
        directory: true,
        multiple: false
    });
    
    if(dirDatabase != null){
        var configFile = dirDatabase + "/config/app.json"
    
        switch (await exists(configFile)){
            case true:
                //console.log(JSON.parse(await readTextFile(configFile)))
                break
            case false:
                await writeTextFile(configFile, '{}');
                break
        }
    }

    return dirDatabase
}