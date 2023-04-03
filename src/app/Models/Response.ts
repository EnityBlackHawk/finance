import { NumberValueAccessor } from "@angular/forms";

export class Response<T>
{
    data: T;
    report: number;
    message: String;

    constructor(data: T, report: number, message: String)
    {
        this.data = data;
        this.report = report;
        this.message = message;
    }
}