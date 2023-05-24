import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { EmailRepository } from './repository/email.repository';
import { PrismaService } from 'src/database/prisma.service';
import { EmailPrismaRepository } from './repository/prisma/email-prisma.repository';

@Module({
  controllers: [EmailController],
  providers: [
    EmailService,
    PrismaService,
    {
      provide: EmailRepository,
      useClass: EmailPrismaRepository,
    },
  ],
})
export class EmailModule {}
