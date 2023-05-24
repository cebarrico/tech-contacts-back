import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { EmailRepository } from './repository/email.repository';

@Injectable()
export class EmailService {
  constructor(private emailRepository: EmailRepository) {}

  async create(createEmailDto: CreateEmailDto) {
    const email = await this.emailRepository.create(createEmailDto);
    return email;
  }

  async findAll(ownerId: string) {
    const emails = await this.emailRepository.findAll(ownerId);
    return emails;
  }

  async findOne(id: string) {
    const findEmail = await this.emailRepository.findOne(id);

    if (!findEmail) {
      throw new NotFoundException('Email not found');
    }
    return findEmail;
  }

  async update(id: string, updateEmailDto: UpdateEmailDto) {
    const findEmail = await this.emailRepository.findOne(id);

    if (!findEmail) {
      throw new NotFoundException('Email not found');
    }
    const email = await this.emailRepository.update(id, updateEmailDto);
    return email;
  }

  async remove(id: string) {
    const findEmail = await this.emailRepository.findOne(id);

    if (!findEmail) {
      throw new NotFoundException('Email not found');
    }

    const email = await this.emailRepository.delete(id);

    return;
  }
}
