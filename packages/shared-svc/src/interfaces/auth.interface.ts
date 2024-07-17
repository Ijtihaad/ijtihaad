import { Rpc } from '@/core/rpc-client';
import { JwtAuthToken, User, _Login, _Register } from '@repo/common';

export interface AuthServiceController {
  register(payload: _Register): Promise<{
    user: User;
    jwt: JwtAuthToken;
  }>;

  login(payload: _Login): Promise<{
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
