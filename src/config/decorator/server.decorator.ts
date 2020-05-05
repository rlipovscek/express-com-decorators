export function Server(){
    return function <T extends {new(...args: any[]): {}}>(constr: T){
        return class extends constr {
          constructor(...args: any[]) {
            super(...args)
            console.log(`iniciando service`)
          }
        }
      }
}
