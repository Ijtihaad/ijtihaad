import { Rpc } from '@/core/rpc-client';
import { JwtAuthToken, User, _LocalLogin, _LocalRegister } from '@repo/common';

export interface AuthServiceController {
  localRegister(payload: _LocalRegister): Promise<{
    user: User;
    jwt: JwtAuthToken;
  }>;

  localLogin(payload: _LocalLogin): Promise<{
    user: User;
    jwt: JwtAuthToken;
  }>;

  googleUrl(): Promise<{ authUrl: string }>;

  googleLogin(payload: { code: string }): Promise<{
    user: User;
    jwt: JwtAuthToken;
  }>;

  refreshAccessToken(payload: { refreshToken: string }): Promise<{
    user: User;
    jwt: JwtAuthToken;
  }>;

  verifyAccessToken(payload: {
    accessToken: string;
  }): Promise<User>;
}

export type AuthRpcService = Rpc<AuthServiceController>;
