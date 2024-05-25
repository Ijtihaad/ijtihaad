import { Rpc } from "@/core/rpc-client";
import { JwtAuthToken, LocalLogin, LocalRegister, User } from "@repo/common";

export interface AuthServiceController {
  localRegister(payload: LocalRegister): Promise<{
    user: User;
    jwt: JwtAuthToken;
  }>;

  localLogin(payload: LocalLogin): Promise<{
    user: User;
    jwt: JwtAuthToken;
  }>;

  googleUrl(): Promise<{ authUrl: string }>;

  googleLogin(payload: { code: string }): Promise<{
    user: User;
    jwt: JwtAuthToken;
  }>;

  refreshAccessToken(
    payload: { refreshToken: string },
  ): Promise<{
    user: User;
    jwt: JwtAuthToken;
  }>;

  verifyAccessToken(
    payload: {
      accessToken: string;
    },
  ): Promise<User>;
}

export type AuthRpcService = Rpc<AuthServiceController>