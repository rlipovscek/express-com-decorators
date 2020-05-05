import  {Api} from '../config/decorator/api.decorator';
import {GET} from '../config/decorator/rest.methods.decorator';
import {Response, Request} from 'express';
import { RouteFactory } from '../config/router.config';

@Api('/asd')
export class Api2{

    constructor(){
       RouteFactory.getRoute().get(`/teste`, this.privateTest);
    }
    @GET('/teste', ['admin'])
    privateTest(request: Request, response: Response){
        return response.send('Retorno da funcao chamada');
    }

    @GET('/teste2')
    privateTest2(request: Request, response: Response){
        return response.send('Retorno da funcao chamada222');
    }

}
