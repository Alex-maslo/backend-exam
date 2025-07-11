import { Injectable } from '@nestjs/common';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from './entities/clinic.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Clinic)
    private clinicRepository: Repository<Clinic>,
  ) {}

  async create(createClinicDto: CreateClinicDto): Promise<Clinic> {
    const clinic = this.clinicRepository.create(createClinicDto);
    return await this.clinicRepository.save(clinic);
  }

  async createMany(createClinicsDto: CreateClinicDto[]): Promise<Clinic[]> {
    const clinics = this.clinicRepository.create(createClinicsDto);
    return await this.clinicRepository.save(clinics);
  }

  async findAll(
    search?: string,
    sort: 'asc' | 'desc' = 'asc',
  ): Promise<Clinic[]> {
    const where = search ? { name: ILike(`%${search}%`) } : {};

    return this.clinicRepository.find({
      where,
      order: { name: sort.toUpperCase() as 'ASC' | 'DESC' },
    });
  }

  //
  // findOne(id: number) {
  //   return `This action returns a #${id} clinic`;
  // }
  //
  // update(id: number, updateClinicDto: UpdateClinicDto) {
  //   return `This action updates a #${id} clinic`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} clinic`;
  // }
}
