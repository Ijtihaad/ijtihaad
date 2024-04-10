export type AccessTokenPayload = {
  userId: string;
};

export type RefreshTokenPayload = {
  userId: string;
};

export type RefreshAccessToken = {
  refreshToken: string;
};

export type AccessAccessToken = {
  accessToken: string;
};

export type JwtToken = RefreshAccessToken & AccessAccessToken;

export type LoginOtp = {
  otpCode: string;
  otpToken: string;
};

export type LoginEmail = {
  email: string;
  password: string;
};

export type RegisterPhone = {
  firstName: string;
  lastName: string;
  phone: string;
};

export type RegisterEmail = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export type SendLoginOtp = {
  phone: string;
};
