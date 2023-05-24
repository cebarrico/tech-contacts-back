import { UpdatePhoneDto } from '../dto/update-phone.dto';
import { CreatePhoneDto } from '../dto/create-phone.dto';
import { Phone } from '../entities/phone.entity';

export abstract class PhoneRepository {
  abstract create(data: CreatePhoneDto): Promise<Phone> | Phone;
  abstract findAll(ownerId: string): Promise<Phone[]> | Phone[];
  abstract findOne(id: string): Promise<Phone> | Phone;
  abstract delete(id: string): Promise<void> | void;
  abstract update(id: string, data: UpdatePhoneDto): Promise<Phone> | Phone;
}
