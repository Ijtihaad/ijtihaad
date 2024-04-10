import { Request } from 'express';

import { Prisma, User } from '@prisma/client';

export type AuthenticatedRequest = Request & {
  user: User;
};

