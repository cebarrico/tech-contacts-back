import { randomUUID } from 'node:crypto';

export class Contact {
  readonly id: string;
  first_name: string;
  last_name: string;
  readonly created_at: string;
  user_id: string;

  constructor() {
    this.id = randomUUID();
    this.created_at = Date.now().toString();
  }
}
