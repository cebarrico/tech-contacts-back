import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { EmailModule } from './modules/email/email.module';
import { PhoneModule } from './modules/phone/phone.module';

@Module({
  imports: [UsersModule, ContactsModule, EmailModule, PhoneModule],
})
export class AppModule {}
