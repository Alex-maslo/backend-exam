import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from '../../doctors/entities/doctor.entity';

@Entity('treatments')
export class Treatment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column('decimal', { nullable: true })
  price?: number;

  @ManyToMany(() => Doctor, (doctor) => doctor.treatments)
  doctors: Doctor[];
}
