import { Inject, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { v4 as uuidV4 } from 'uuid';

export type ParametersType<T> = T extends (args: infer P) => any ? P : never;
export type ReturnType<T> = T extends (args: any) => infer R ? R : any;

export type Rpc<ObjectType> = <P extends keyof ObjectType>(
  path: P,
  args: ParametersType<ObjectType[P]>,
) => Observable<ReturnType<ObjectType[P]>>;

export class RpcClient implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('RPC_SERVICE') private client: ClientProxy) { }

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  createRpcClient<ObjectType extends object>(
    namespace: string,
  ): Rpc<ObjectType> {
    return (path, args) => {
      const authorization = jwt.sign(
        { requestId: uuidV4() },
        process.env.JWT_SERVICE_SECRETE_KEY!,
        { expiresIn: '2s' }
      );
      return this.client.send(`${namespace}:${path as string}`, {
        data: args,
        headers: { authorization: `Bearer ${authorization}` },
      });
    };
  }
}
