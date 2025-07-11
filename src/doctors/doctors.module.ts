import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { Doctor } from './entities/doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treatment } from '../treatments/entities/treatment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor]),
    TypeOrmModule.forFeature([Treatment]),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}
