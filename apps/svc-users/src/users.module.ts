import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserQueryParser } from './parsers/user-query.parser';
import { DrizzleModule } from './drizzle/drizzle.module';
import { DrizzleService } from './drizzle/drizzle.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DrizzleModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', './apps/users/.env'],
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, DrizzleService, UserQueryParser, ConfigService],
})
export class UsersModule {}
