import { ErrorHandler } from "../../config/handler/error.handler";

export class PermissionError extends ErrorHandler{
    constructor(public statusCode: number,public message: string){
        super(statusCode, message);
    }
}