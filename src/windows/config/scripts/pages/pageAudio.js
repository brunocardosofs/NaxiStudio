async function listDevices(id){
    const select = document.createElement("select")
    select.setAttribute("id", id)
    select.classList.add("audio-output")

    await navigator.mediaDevices.enumerateDevices()
    .then(devices => {
        const audioDevices = devices.filter(device => device.kind === 'audiooutput');

        audioDevices.forEach(device => {
            const option = document.createElement("option")
            option.value = device.deviceId
            option.text = device.label
            select.append(option)
        });
    })
    .catch(error => {
        console.error(error);
    });

    return select.outerHTML
}

function getPermission(){
    navigator.mediaDevices.getUserMedia({ 
        video: false,
        audio: true
    })
}

export async function pageAudio(){
    return `
        <div class="select">
            <h1>Audio:</h1>
            
            <br>
            <p>Saída do Player 1: ${await listDevices("deviceP1")}</p>
            <p>Saída do Player 2: ${await listDevices("deviceP2")}</p>
            <p>Saída do Player 3: ${await listDevices("deviceP3")}</p>
            <br>
            <p>Saída dos Comerciais: ${await listDevices("deviceCom")}</p>
            <p>Saída da Cartucheira: ${await listDevices("deviceCar")}</p>
            <br>
            <p>Saída do CUE: ${await listDevices("deviceCue")}</p>
        </div>
    `
}

export function changeAudio(type, id){
    localStorage.setItem(type, id)
}