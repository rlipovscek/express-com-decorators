import {Router} from 'express';


 interface Route{
    router: Router
}

const INSTANCE = {
    router: Router()
}
export class RouteFactory{
    private static instance: Route; 

    constructor(){
        if(!RouteFactory.instance){
            RouteFactory.instance = INSTANCE;
        }
    }

    static getRoute(): Router{

        if(!RouteFactory.instance){
            RouteFactory.instance = INSTANCE;
        }

        return RouteFactory.instance.router;
    }
}

  

  
  