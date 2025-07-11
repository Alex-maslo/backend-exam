import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Treatment } from '../../treatments/entities/treatment.entity';
import { Clinic } from '../../clinics/entities/clinic.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true, type: 'text' })
  specialization?: string;

  @ManyToMany(() => Treatment, (treatment) => treatment.doctors, {
    cascade: true,
  })
  @JoinTable()
  treatments: Treatment[];

  @ManyToMany(() => Clinic, (clinic) => clinic.doctors)
  clinics: Clinic[];
}
