import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { TreatmentService } from './treatments.service';
import { Treatment } from './entities/treatment.entity';

@Controller('treatments')
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}

  @Post()
  create(@Body() createDto: CreateTreatmentDto): Promise<Treatment> {
    return this.treatmentService.create(createDto);
  }

  @Post('batch')
  createMany(@Body() createDto: CreateTreatmentDto[]): Promise<Treatment[]> {
    return this.treatmentService.createMany(createDto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('sort') sort: 'id' | 'name' = 'id',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ): Promise<Treatment[]> {
    return this.treatmentService.findAll(search, sort, order);
  }
}
