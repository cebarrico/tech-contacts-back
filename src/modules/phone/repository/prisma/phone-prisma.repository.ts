import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePhoneDto } from '../../dto/create-phone.dto';
import { UpdatePhoneDto } from '../../dto/update-phone.dto';
import { Phone } from '../../entities/phone.entity';
import { PhoneRepository } from '../phone.repository';

@Injectable()
export class PhonePrismaRepository implements PhoneRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreatePhoneDto): Promise<Phone> {
    const phone = new Phone();
    Object.assign(phone, { ...data });

    if (phone.userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: phone.userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      const newPhone = await this.prisma.phone.create({
        data: { ...data },
      });
      return plainToInstance(Phone, newPhone);
    }

    if (phone.contactId) {
      const contact = await this.prisma.contact.findUnique({
        where: { id: phone.contactId },
      });

      if (!contact) {
        throw new NotFoundException('Contact not found');
      }
      const newPhone = await this.prisma.phone.create({
        data: { ...data },
      });
      return plainToInstance(Phone, newPhone);
    }

    throw new PreconditionFailedException('UserId or ContactId are required');
  }

  async findAll(ownerId: string): Promise<Phone[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: ownerId },
    });
    const contact = await this.prisma.contact.findUnique({
      where: { id: ownerId },
    });
    if (user) {
      const phones = await this.prisma.phone.findMany({
        where: { userId: user.id },
      });
      return plainToInstance(Phone, phones);
    }
    if (contact) {
      const phones = await this.prisma.phone.findMany({
        where: { contactId: contact.id },
      });
      return plainToInstance(Phone, phones);
    }
    throw new NotFoundException('Owner not found');
  }

  async findOne(id: string): Promise<Phone> {
    const phone = await this.prisma.phone.findUnique({
      where: { id },
    });
    return plainToInstance(Phone, phone);
  }

  async delete(id: string): Promise<void> {
    const phone = await this.prisma.phone.delete({
      where: { id },
    });
  }

  async update(id: string, data: UpdatePhoneDto): Promise<Phone> {
    const phone = await this.prisma.phone.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(Phone, phone);
  }
}
