export const jwtConstants = {
  accessSecretKey:
    process.env.JWT_ACCESS_SECRETE_KEY ?? 'hsgjkdlfb;gho;geivk,jx rwo;48973',
  refreshSecretKey:
    process.env.JWT_REFRESH_SECRETE_KEY ??
    "bk,vfl4p920['-u3tphefgb.vr;3o84lger,fkbdva",
  expiresAccessToken: process.env.JWT_ACCESS_LIFETIME ?? '1d',
  expiresRefreshToken: process.env.JWT_REFRESH_LIFETIME ?? '7d',

  tokenSecretKey:
    process.env.JWT_TOKEN_SECRETE_KEY ?? 'hsgjkdlfb;gho;geivk,jx rwo;48973',
};
