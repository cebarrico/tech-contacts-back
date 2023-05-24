import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { CreateEmailDto } from '../../dto/create-email.dto';
import { UpdateEmailDto } from '../../dto/update-email.dto';
import { Email } from '../../entities/email.entity';
import { EmailRepository } from '../email.repository';

@Injectable()
export class EmailPrismaRepository implements EmailRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEmailDto): Promise<Email> {
    const email = new Email();
    Object.assign(email, { ...data });

    if (email.userId) {
      const contact = await this.prisma.user.findUnique({
        where: { id: email.userId },
      });
      if (!contact) {
        throw new NotFoundException('Contact not found');
      }
      const newEmail = await this.prisma.email.create({
        data: { ...data },
      });
      return plainToInstance(Email, newEmail);
    }

    if (email.contactId) {
      const contact = await this.prisma.contact.findUnique({
        where: { id: email.contactId },
      });

      if (!contact) {
        throw new NotFoundException('Contact not found');
      }
      const newEmail = await this.prisma.email.create({
        data: { ...data },
      });
      return plainToInstance(Email, newEmail);
    }

    throw new PreconditionFailedException('UserId or ContactId is required');
  }

  async findAll(ownerId: string): Promise<Email[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: ownerId },
    });

    const contact = await this.prisma.contact.findUnique({
      where: { id: ownerId },
    });

    if (user) {
      const emails = await this.prisma.email.findMany({
        where: { userId: user.id },
      });
      return plainToInstance(Email, emails);
    }

    if (contact) {
      const emails = await this.prisma.email.findMany({
        where: { contactId: contact.id },
      });
      return plainToInstance(Email, emails);
    }

    throw new NotFoundException('Contact not found');
  }

  async findOne(id: string): Promise<Email> {
    const email = await this.prisma.email.findUnique({
      where: { id },
    });
    return plainToInstance(Email, email);
  }

  async delete(id: string): Promise<void> {
    const email = await this.prisma.email.delete({
      where: { id },
    });
  }

  async update(id: string, data: UpdateEmailDto): Promise<Email> {
    const email = await this.prisma.email.update({
      where: { id },
      data: { ...data },
    });
    return plainToInstance(Email, email);
  }
}
