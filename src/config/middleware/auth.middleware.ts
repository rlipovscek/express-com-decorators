import { Request, Response, NextFunction } from "express";

const user = {
    name: 'Rodolpho',
    roles:[
        'admin',
        'user'
    ]
}

export function authMeddleware(request: Request, response: Response, next: NextFunction){
    if(!request.body){
        request.body = {};
    }
    request.body.internalUserInfo = user;

    next();
}