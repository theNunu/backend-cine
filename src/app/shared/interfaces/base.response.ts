export interface BaseResponseI<T> {
    
    code : number,
    message : string,
    data: T[] | T | null
}