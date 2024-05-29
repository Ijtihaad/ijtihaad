import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DrizzleModule } from './drizzle/drizzle.module';
import { DrizzleService } from './drizzle/drizzle.service';
import { UserQueryParser } from './parsers/user-query.parser';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    DrizzleModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', './apps/users/.env'],
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    DrizzleService,
    UserQueryParser,
    ConfigService,
    JwtService,
  ],
})
export class UsersModule {}
