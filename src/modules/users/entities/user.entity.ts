import { randomUUID } from 'node:crypto';
import { Exclude } from 'class-transformer';

export class User {
  readonly id: string;
  first_name: string;
  last_name: string;
  main_email: string;
  main_phone: string;

  @Exclude()
  password: string;

  readonly created_at: Date;
}
