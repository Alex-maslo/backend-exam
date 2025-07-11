import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doctor } from '../../doctors/entities/doctor.entity';

@Entity('clinics')
export class Clinic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @ManyToMany(() => Doctor, (doctor) => doctor.clinics, { cascade: true })
  @JoinTable() // керуємо проміжною таблицею з цього боку
  doctors: Doctor[];
}
