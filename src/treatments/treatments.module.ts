import { Module } from '@nestjs/common';
import { TreatmentController } from './treatments.controller';
import { TreatmentService } from './treatments.service';
import { Treatment } from './entities/treatment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Treatment])],
  controllers: [TreatmentController],
  providers: [TreatmentService],
})
export class TreatmentsModule {}
