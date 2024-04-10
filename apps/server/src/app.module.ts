import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { NotificationsModule } from './notification/notifications.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', './apps/server/.env'],
    }),
    UsersModule,
    AuthModule,
    FilesModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
