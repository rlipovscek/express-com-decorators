import express, { Application } from 'express';
import { Server } from './config/decorator/server.decorator';
import { handleError } from './config/handler/error.handler';
import { authMeddleware } from './config/middleware/auth.middleware';
import { RouteFactory } from './config/router.config';
import { Api2 } from './controllers/api.controller';



@Server()
export class ServerExpress{
    private app: Application;

    public constructor(){
        this.app = express();
        new Api2();
        this.init();
    }

    private init(){
        this.app.use(authMeddleware);
        this.app.use(RouteFactory.getRoute());
        this.app.use(handleError);
        this.app.listen(3000, () =>{
            console.log('iniciado');
        })
    }
}

new ServerExpress();