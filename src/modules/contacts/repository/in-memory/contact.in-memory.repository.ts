import { UpdateContactDto } from '../../dto/update-contact.dto';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { Contact } from '../../entities/contact.entity';
import { ContactRepository } from '../contact.repository';

export class ContactInMemoryRepository implements ContactRepository {
  private database: Contact[] = [];

  create(data: CreateContactDto): Promise<Contact> | Contact {
    const newContact = new Contact();
    Object.assign(newContact, {
      ...data,
    });
    this.database.push(newContact);

    return newContact;
  }
}
