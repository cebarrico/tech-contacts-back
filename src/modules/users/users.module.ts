import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repository/user.repository';
import { UserInMemoryRepository } from './repository/in-memory/user.in-memory.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UserRepository,
      useClass: UserInMemoryRepository,
    },
  ],
})
export class UsersModule {}
