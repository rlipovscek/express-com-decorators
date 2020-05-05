import "reflect-metadata";
import { CreatedRoute } from '../interfaces/created-route.interface';
import { PermissionError } from "../../api/error/permission.error";


export function GET(path: string, roles?: Array<string>): MethodDecorator{
    return (target: Object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => 
    {
       descriptor.writable = true;
        var originalMethod = descriptor.value; 

        if(!Reflect.hasMetadata('apiRoutes', target.constructor)){
          Reflect.defineMetadata('apiRoutes', [], target.constructor);
        }
        const routes: Array<CreatedRoute> = Reflect.getMetadata('apiRoutes', target.constructor) as Array<CreatedRoute>;
       

        descriptor.value =  function (...args: any[]) { 
            if(roles){
              let hasRole = false;
            if(args[0]?.body?.internalUserInfo){
             let userRoles =args[0]?.body?.internalUserInfo?.roles;
             roles.forEach(r =>{
                 if(userRoles.includes(r)){
                     hasRole = true;
                     return;
                 }
             });
            }
              if(!hasRole){
                  throw new PermissionError(403, "Erro de acesso");
              }
            }
            let ret = originalMethod.apply(this, args);
            return ret;
        }
        routes.push({
          func:  descriptor.value,
          path: path,
          type: 'get'
        });


    }
}




