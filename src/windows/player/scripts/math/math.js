export function timeMath(data){
    // Receives data in seconds and formats it to xx:yy:zz

    let out, h = 0, m = 0

    let [s, ms] = data.toString().split('.')

    ms = ms.slice(0, 2)
    s = parseInt(s)
    
    if(s >= 60 && s < 3600){
        [m, s] = (data/60).toString().split('.');
        s = Math.trunc(parseFloat("0."+s)*60)
    }

    if(data < 3600){
        out = `${zeroMath(m)}:${zeroMath(s)}:${ms}`
    }else{
        out = `${zeroMath(h)}:${zeroMath(m)}:${zeroMath(s)}:${ms}`
    }

    return out
}

export function zeroMath(x){
    if(x < 10){
        x = "0" + x
    }
    return x
}