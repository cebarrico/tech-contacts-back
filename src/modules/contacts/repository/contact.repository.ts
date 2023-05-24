import { UpdateContactDto } from '../dto/update-contact.dto';
import { CreateContactDto } from '../dto/create-contact.dto';
import { Contact } from '../entities/contact.entity';

export abstract class ContactRepository {
  abstract create(
    userId: string,
    data: CreateContactDto,
  ): Promise<Contact> | Contact;
  abstract findAll(id: string): Promise<Contact[]> | Contact[];
  abstract findOne(id: string): Promise<Contact> | Contact;
  abstract delete(id: string): Promise<void> | void;
  abstract update(
    id: string,
    data: UpdateContactDto,
  ): Promise<Contact> | Contact;
}
