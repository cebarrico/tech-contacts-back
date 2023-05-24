import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PhoneRepository } from './repository/phone.repository';

@Injectable()
export class PhoneService {
  constructor(private phoneRepository: PhoneRepository) {}

  async create(createPhoneDto: CreatePhoneDto) {
    const phone = await this.phoneRepository.create(createPhoneDto);
    return phone;
  }

  async findAll(ownerId: string) {
    const phones = await this.phoneRepository.findAll(ownerId);
    return phones;
  }

  async findOne(id: string) {
    const findPhone = await this.phoneRepository.findOne(id);
    if (!findPhone) {
      throw new NotFoundException('Phone not found');
    }
    return findPhone;
  }

  async update(id: string, updatePhoneDto: UpdatePhoneDto) {
    const findPhone = await this.phoneRepository.findOne(id);

    if (!findPhone) {
      throw new NotFoundException('Phone not found');
    }

    const phone = await this.phoneRepository.update(id, updatePhoneDto);
    return phone;
  }

  async remove(id: string) {
    const findPhone = await this.phoneRepository.findOne(id);

    if (!findPhone) {
      throw new NotFoundException('Phone not found');
    }

    const phone = await this.phoneRepository.delete(id);
    return;
  }
}
