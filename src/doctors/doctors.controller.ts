import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorsService.create(createDoctorDto);
  }

  @Post('batch')
  createMany(@Body() createDoctorDto: CreateDoctorDto[]): Promise<Doctor[]> {
    return this.doctorsService.createMany(createDoctorDto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('sort') sort: 'id' | 'firstName' | 'lastName' = 'id',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ): Promise<Doctor[]> {
    return this.doctorsService.findAll(search, sort, order);
  }
}
