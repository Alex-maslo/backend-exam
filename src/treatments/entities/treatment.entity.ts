import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
