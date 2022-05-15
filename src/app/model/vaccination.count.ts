export class Count{
    count:number

    constructor(obj?:any){
        this.count = obj && obj.count || 0
    }
}