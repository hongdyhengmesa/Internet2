import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Receipts {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  issuedAt!: Date;

  @Column()
  name!: string;

  @Column()
  price!: number;
}