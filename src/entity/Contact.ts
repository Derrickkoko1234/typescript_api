// src/entity/Contact.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from 'typeorm';
import { User } from './User';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name?: string;

  @Column()
  email?: string;

  @Column()
  phone?: string;

  @ManyToOne(() => User, (user) => user.contacts)
  user?: User;

  @BeforeInsert()
  generateUuid() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
