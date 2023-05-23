import { randomUUID } from 'node:crypto';
import { Exclude } from 'class-transformer';

export class User {
  readonly id: string;
  name: string;

  @Exclude()
  password: string;

  readonly created_at: string;

  constructor() {
    this.id = randomUUID();
    this.created_at = Date.now().toString();
  }
}
