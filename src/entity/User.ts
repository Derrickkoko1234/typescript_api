// src/entity/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Contact } from "./Contact";
import { BeforeInsert } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  username?: string;

  @Column()
  password!: string;

  @Column({ default: false })
  isAdmin?: boolean;

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts?: Contact[];

  @BeforeInsert()
  generateUuid() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
