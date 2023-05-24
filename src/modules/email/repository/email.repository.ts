import { UpdateEmailDto } from '../dto/update-email.dto';
import { CreateEmailDto } from '../dto/create-email.dto';
import { Email } from '../entities/email.entity';

export abstract class EmailRepository {
  abstract create(data: CreateEmailDto): Promise<Email> | Email;
  abstract findAll(ownerId: string): Promise<Email[]> | Email[];
  abstract findOne(id: string): Promise<Email> | Email;
  abstract delete(id: string): Promise<void> | void;
  abstract update(id: string, data: UpdateEmailDto): Promise<Email> | Email;
}
