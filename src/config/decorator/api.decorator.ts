

import {RouteFactory} from '../router.config';
import { CreatedRoute } from '../interfaces/created-route.interface';
import { RequestHandler } from 'express';

export function Api2<T extends {new(...args:any[]):{}}>(constructor:T) {
  return class extends constructor {
      newProperty = "new property";
      hello = "override";
  }
}

export function Api(path: string) {
  return function <T extends {new(...args: any[]): {}}>(constr: T){
    return class extends constr {
      constructor(...args: any[]) {
        super(...args)
        if(!Reflect.hasMetadata('apiRoutes', this.constructor)){
          Reflect.defineMetadata('apiRoutes', [], this.constructor);
        }

        let routes: Array<CreatedRoute> = Reflect.getMetadata('apiRoutes', this.constructor) as Array<CreatedRoute>;
        routes.forEach(route => {
          console.log(path + route.path)
          RouteFactory.getRoute()[route.type](path + route.path, <RequestHandler>(<Function>route.func));
        })
      }
    }
  }
};