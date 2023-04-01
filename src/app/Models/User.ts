export class User
{
    id: String;
    name : String;
    value : number;

    constructor(id:string, name:string, value:number)
    {
        this.id = id;
        this.name = name;
        this.value = value;
    }

    public getId(): String
    {
        return this.id;
    }
}