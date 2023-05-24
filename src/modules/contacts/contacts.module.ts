import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { ContactRepository } from './repository/contact.repository';
import { ContactPrismaRepository } from './repository/prisma/contact-prisma.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [UsersModule],
  controllers: [ContactsController],
  providers: [
    ContactsService,
    PrismaService,
    {
      provide: ContactRepository,
      useClass: ContactPrismaRepository,
    },
  ],
})
export class ContactsModule {}
