import { Subscribe, UpdateNotification, User } from '@common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../users/decorators/current-user-decorator';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  private readonly logger = new Logger(NotificationsController.name);
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getNotification(@CurrentUser() user: User) {
    const notifications = await this.notificationsService.findMany({
      OR: [
        {
          userId: user.id,
        },
        {
          toRole: user.role,
        },
      ],
    });
    this.notificationsService.sendAll({
      userId: user.id,
      checked: false,
    });
    return notifications;
  }

  @Patch(':notificationId')
  @UseGuards(JwtAuthGuard)
  async updateNotification(
    @Param('notificationId') notificationId: string,
    @Body() data: UpdateNotification,
    @CurrentUser() user: User
  ) {
    const notifications = await this.notificationsService.update(
      {
        id: notificationId,
        OR: [
          {
            userId: user.id,
          },
          {
            toRole: user.role,
          },
        ],
      },
      data
    );

    return notifications;
  }

  @Delete(':notificationId')
  @UseGuards(JwtAuthGuard)
  async deleteNotification(
    @Param('notificationId') notificationId: string,
    @CurrentUser() user: User
  ) {
    const notifications = await this.notificationsService.delete({
      id: notificationId,
      OR: [
        {
          userId: user.id,
        },
        {
          toRole: user.role,
        },
      ],
    });

    return notifications;
  }

  @Post('subscribe')
  async subscribe(@Body() data: Subscribe) {
    const subscription = await this.notificationsService.subscribe(data);
    return {};
  }
}
