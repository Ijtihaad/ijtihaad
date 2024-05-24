import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

type ParametersType<T> = T extends (args: infer P) => any ? P : never;
type ReturnType<T> = T extends (args: any) => infer R ? R : any;

type Rpc<ObjectType> = <P extends keyof ObjectType>(
  path: P,
  args: ParametersType<ObjectType[P]>,
) => Observable<ReturnType<ObjectType[P]>>;

export class RpcHandler {
  static createRpcClient<ObjectType extends object>(
    namespace: string,
    client: ClientProxy,
  ): Rpc<ObjectType> {
    const rpc: Rpc<ObjectType> = (path, args) => {
      return client.send(`${namespace}:${path as string}`, args);
    };

    return rpc;
  }
}
