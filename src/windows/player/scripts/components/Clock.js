export default function Clock(){
    const date = new Date()
    const day = date.getDate();
    const month = (date.getMonth() + 1);
    const year = date.getFullYear()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    function zero(x){
        if(x < 10){
            x = "0" + x
        }
        return x
    }

    return `${zero(day)}/${zero(month)}/${year} ${zero(hour)}:${zero(minute)}:${zero(second)}`
}