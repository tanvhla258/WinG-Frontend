export function convertStringTime(time:string){
    return new Date(Date.parse(time)).toISOString().slice(0, 10)
}