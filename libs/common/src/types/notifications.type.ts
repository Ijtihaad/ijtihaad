import { Prisma } from '@prisma/client';

export type NotificationWhereInput = Prisma.NotificationWhereInput;

export type NotificationWhereUniqueInput = Prisma.NotificationWhereUniqueInput;

export type NotificationCreateInput = Prisma.NotificationCreateInput;

export type NotificationUpdateInput = Prisma.NotificationUpdateInput;

export type NotificationCreateManyInput = Prisma.NotificationCreateManyInput;

export type SubscriptionWhereInput =
  Prisma.SubscriptionWhereInput;

export type SubscriptionWhereUniqueInput =
  Prisma.SubscriptionWhereUniqueInput;

export type SubscriptionCreateInput =
  Prisma.SubscriptionCreateInput;

export type SubscriptionUpdateInput =
  Prisma.SubscriptionUpdateInput;

export type SubscriptionCreateManyInput =
  Prisma.SubscriptionCreateManyInput;

export type Subscribe = {
  subscription: PushSubscription;
  endpoint: string;
  userId?: string;
};

export type PushNotification = {
  title: string;
  body: string;
};

export type PublishNotification = {
  title: string;
  body: string;
};

export type UpdateNotification = {
  checked: boolean;
};
