import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/database/prisma.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repository/user.repository';
import { UserInMemoryRepository } from './repository/in-memory/user.in-memory.repository';

import { UserPrismaRepository } from './repository/prisma/user.prisma.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [UserRepository],
})
export class UsersModule {}
