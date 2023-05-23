import { UpdateContactDto } from '../dto/update-contact.dto';
import { CreateContactDto } from '../dto/create-contact.dto';
import { Contact } from '../entities/contact.entity';

export abstract class ContactRepository {
  abstract create(data: CreateContactDto): Promise<Contact> | Contact;
}
