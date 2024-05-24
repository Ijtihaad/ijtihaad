import 'dotenv/config';

export const jwtConstants = {
  accessSecretKey: (process.env.JWT_ACCESS_SECRETE_KEY =
    'UcFHSsIiKhHzqa5Kc3lR4z64BBcXwoS87gXfpmF2OtLgNeYre/PJULNobDPHyDXD9x23hZB+Zas/tN8U+GZKIg=='),
  refreshSecretKey: (process.env.JWT_REFRESH_SECRETE_KEY =
    'asVhHMjatyLgA374tWmmE9uhbZlSy0j9MKQqIg5Mhx/1FZhEwIn6ZsTz8tqsl9d+xfTGzDwM8Ie7reerR867NQ=='),
  accessTokenLifetime: process.env.JWT_ACCESS_LIFETIME ?? '15m',
  refreshTokenLifetime: process.env.JWT_REFRESH_LIFETIME ?? '7d',
};
