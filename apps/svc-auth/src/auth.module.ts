import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { GoogleAuthService } from './google-auth/google-auth.service';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import { JwtAuthService } from './jwt-auth/jwt-auth.service';

@Module({
  imports: [GoogleAuthModule, JwtAuthModule, JwtModule, ClientsModule.register([
    {
      name: 'USERS_SERVICE',
      transport: Transport.NATS,
      options: {
        servers: [process.env.NATS_SERVER_URL!],
      },
    },
  ]),],
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthService, JwtAuthService],
})
export class AuthModule { }
