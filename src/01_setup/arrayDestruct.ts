export default function arrayDestruct(list:any[]){
    const [first, ...rest] = list;
    return {first, rest}
}
