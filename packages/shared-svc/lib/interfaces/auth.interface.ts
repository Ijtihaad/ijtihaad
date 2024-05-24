import { ServiceRequest } from "./request.interface";
import { JwtAuthToken, LocalLogin, LocalRegister, User } from "@repo/common";
import { RpcHandler } from '../core/rpc-handler';

export interface AuthServiceController {
  localRegister(payload: ServiceRequest<LocalRegister>): Promise<{
    user: User;
    jwt: JwtAuthToken;
  }>;

  localLogin(payload: ServiceRequest<LocalLogin>): Promise<{
    user: User;
    jwt: JwtAuthToken;
  }>;

  googleUrl(): Promise<{ authUrl: string }>;

  googleLogin(payload: ServiceRequest<{ code: string }>): Promise<{
    user: User;
    jwt: JwtAuthToken;
  }>;

  refreshAccessToken(
    payload: ServiceRequest<{ refreshToken: string }>,
  ): Promise<{
    user: User;
    jwt: JwtAuthToken;
  }>;

  verifyAccessToken(
    payload: ServiceRequest<{
      accessToken: string;
    }>,
  ): Promise<User>;
}

export type AuthRpcService = ReturnType<
  typeof RpcHandler.createRpcClient<AuthServiceController>
>;
