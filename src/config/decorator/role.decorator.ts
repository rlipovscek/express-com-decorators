import { PermissionError } from "../../api/error/permission.error";

export function role(roles: Array<string>)
{
    return (target: any, key: string, descriptor: any) => 
    {
        var originalMethod = descriptor.value; 

        descriptor.value =  function (...args: any[]) {
            let hasRole = false;
            console.log(`Arguments for ${roles}: ${args}`);
            if(args[0]?.body?.internalUserInfo){
             let userRoles =args[0]?.body?.internalUserInfo?.roles;
             roles.forEach(r =>{
                 if(userRoles.includes(r)){
                     hasRole = true;
                     return;
                 }
             });
            }

            console.log("dentro do decorator 11111")

            if(!hasRole){
                throw new PermissionError(403, "Erro de acesso");
            }
            let ret = originalMethod.apply(this, args);
            console.log("dentro do decorator 222222")
            return ret;
        }

        return descriptor;
    }
}
