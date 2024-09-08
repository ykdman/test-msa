import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  exports: [UserService],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'USER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'localhost', //user-service
            port: 3001,
          },
        });
      },
    },
  ],
})
export class UserModule {}
