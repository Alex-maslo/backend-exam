import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { Clinic } from './entities/clinic.entity';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Post()
  create(@Body() createClinicDto: CreateClinicDto): Promise<Clinic> {
    return this.clinicsService.create(createClinicDto);
  }

  @Post('batch')
  createMany(@Body() createClinicsDto: CreateClinicDto[]): Promise<Clinic[]> {
    return this.clinicsService.createMany(createClinicsDto);
  }

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('sort') sort?: 'asc' | 'desc',
  ): Promise<Clinic[]> {
    return this.clinicsService.findAll(search, sort);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.clinicsService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateClinicDto: UpdateClinicDto) {
  //   return this.clinicsService.update(+id, updateClinicDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.clinicsService.remove(+id);
  // }
}
