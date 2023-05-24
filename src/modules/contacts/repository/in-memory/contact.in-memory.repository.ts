import { UpdateContactDto } from '../../dto/update-contact.dto';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { Contact } from '../../entities/contact.entity';
import { ContactRepository } from '../contact.repository';

export class ContactInMemoryRepository implements ContactRepository {
  private database: Contact[] = [];

  create(userId: string, data: CreateContactDto): Promise<Contact> | Contact {
    const newContact = new Contact();
    Object.assign(newContact, {
      ...data,
    });
    this.database.push(newContact);

    return newContact;
  }

  findAll(id: string): Contact[] | Promise<Contact[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string): Contact | Promise<Contact> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): void | Promise<void> {
    throw new Error('Method not implemented.');
  }

  update(id: string, data: UpdateContactDto): Contact | Promise<Contact> {
    throw new Error('Method not implemented.');
  }
}
