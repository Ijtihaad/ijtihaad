import {
  NotificationCreateInput,
  SubscriptionCreateInput,
  SubscriptionWhereInput,
  NotificationUpdateInput,
  NotificationWhereInput,
  NotificationWhereUniqueInput,
  PushNotification,
} from '@common';
import { Injectable, NotFoundException } from '@nestjs/common';
import webpush from 'web-push';
import { webpushConstant } from '../global/constants/webpush.constant';
import { PrismaService } from '../global/services/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {
    webpush.setVapidDetails(
      webpushConstant.subject,
      webpushConstant.publicVapidKey,
      webpushConstant.privateVapidKey
    );
  }

  async subscribe(data: SubscriptionCreateInput) {
    const exist = await this.prisma.subscription.findFirst({
      where: {
        endpoint: data.endpoint,
      },
    });
    if (exist) {
      return await this.prisma.subscription.update({
        where: { id: exist.id },
        data,
      });
    } else {
      return await this.prisma.subscription.create({ data });
    }
  }

  async create(data: NotificationCreateInput) {
    const notification = await this.prisma.notification.create({ data });
    if (notification.userId) {
      this.send({ userId: notification.userId }, notification);
    } else if (notification.toRole) {
      this.send({ user: { role: notification.toRole } }, notification);
    } else {
      this.send({}, notification);
    }
    return notification;
  }

  async update(
    where: NotificationWhereUniqueInput,
    data: NotificationUpdateInput
  ) {
    const notificationExist = await this.prisma.notification.findFirst({
      where,
    });
    if (!notificationExist) {
      throw new NotFoundException('Notification not found');
    }
    const notification = await this.prisma.notification.update({ where, data });
    return notification;
  }

  async delete(where: NotificationWhereUniqueInput) {
    const notification = await this.prisma.notification.delete({ where });
    return notification;
  }

  async findMany(where: NotificationWhereInput) {
    return this.prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async send(
    where: SubscriptionWhereInput,
    payload: PushNotification
  ) {
    const subscribers = await this.prisma.subscription.findMany({
      where,
    });
    const notificationPayload = JSON.stringify(payload);
    for (const item of subscribers) {
      try {
        const subscribe =
          item.subscription as unknown as webpush.PushSubscription;
        await webpush.sendNotification(subscribe, notificationPayload);
      } catch (error) {
        console.error(error);
      }
    }

    return {};
  }

  async sendMany(
    where: SubscriptionWhereInput,
    payload: PushNotification[]
  ) {
    const subscribers = await this.prisma.subscription.findMany({
      where,
    });
    const notificationPayload = JSON.stringify(payload);
    const webpushPromises = [];
    for (const item of subscribers) {
      try {
        const subscribe =
          item.subscription as unknown as webpush.PushSubscription;
        webpushPromises.push(
          webpush.sendNotification(subscribe, notificationPayload)
        );
      } catch (error) {
        console.error(error);
      }
    }

    await Promise.all(webpushPromises);
    return {};
  }

  async sendAll(where: NotificationWhereInput) {
    const notifications = await this.prisma.notification.findMany({
      where,
    });
    for (const notification of notifications) {
      if (notification.userId) {
        this.send({ userId: notification.userId }, notification);
      } else if (notification.toRole) {
        this.send({ user: { role: notification.toRole } }, notification);
      } else {
        this.send({}, notification);
      }
    }

    return {};
  }
}
