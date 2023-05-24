import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactRepository } from './repository/contact.repository';

@Injectable()
export class ContactsService {
  constructor(private contactRepository: ContactRepository) {}

  async create(userId: string, createContactDto: CreateContactDto) {
    const contact = await this.contactRepository.create(
      userId,
      createContactDto,
    );
    return contact;
  }

  async findAll(userId: string) {
    const contacts = await this.contactRepository.findAll(userId);
    return contacts;
  }

  async findOne(id: string) {
    const findContact = await this.contactRepository.findOne(id);
    if (!findContact) {
      throw new NotFoundException('User not found');
    }
    return findContact;
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const findContact = await this.contactRepository.findOne(id);
    if (!findContact) {
      throw new NotFoundException('User not found');
    }

    const contact = await this.contactRepository.update(id, updateContactDto);
    return contact;
  }

  async remove(id: string) {
    const findContact = await this.contactRepository.findOne(id);
    if (!findContact) {
      throw new NotFoundException('User not found');
    }
    const contact = await this.contactRepository.delete(id);

    return;
  }
}
