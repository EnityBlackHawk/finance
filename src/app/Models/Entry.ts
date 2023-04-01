import { User } from "./User";

export class Entry
{
    id : String;
    date: Date;
    value: number;
    description: string;
    credit: boolean;
    user: User;

    constructor(id: String, date:Date, value:number, description:string, isCredit:boolean, user:User)
    {
        this.id = id;
        this.date = date;
        this.value = value;
        this.description = description;
        this.credit = isCredit;
        this.user = user;
    }

}