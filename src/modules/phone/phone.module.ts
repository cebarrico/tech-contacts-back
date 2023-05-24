import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { PhoneRepository } from './repository/phone.repository';
import { PrismaService } from 'src/database/prisma.service';
import { PhonePrismaRepository } from './repository/prisma/phone-prisma.repository';

@Module({
  controllers: [PhoneController],
  providers: [
    PhoneService,
    PrismaService,
    {
      provide: PhoneRepository,
      useClass: PhonePrismaRepository,
    },
  ],
})
export class PhoneModule {}
