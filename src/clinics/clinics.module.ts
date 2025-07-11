import { Module } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { ClinicsController } from './clinics.controller';
import { Clinic } from './entities/clinic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from '../doctors/entities/doctor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clinic]),
    TypeOrmModule.forFeature([Doctor]),
  ],
  controllers: [ClinicsController],
  providers: [ClinicsService],
})
export class ClinicsModule {}
