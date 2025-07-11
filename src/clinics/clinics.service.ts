import { Injectable } from '@nestjs/common';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from './entities/clinic.entity';
import { ILike, In, Repository } from 'typeorm';
import { Doctor } from '../doctors/entities/doctor.entity';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Clinic)
    private clinicRepository: Repository<Clinic>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async create(createClinicDto: CreateClinicDto): Promise<Clinic> {
    const { doctorIds = [], ...clinicData } = createClinicDto;

    const doctors = await this.doctorRepository.findBy({
      id: In(doctorIds),
    });

    const clinic = this.clinicRepository.create({
      ...clinicData,
      doctors,
    });

    return this.clinicRepository.save(clinic);
  }

  async createMany(createClinicsDto: CreateClinicDto[]): Promise<Clinic[]> {
    const clinics: Clinic[] = [];

    for (const dto of createClinicsDto) {
      const { doctorIds = [], ...clinicData } = dto;

      const doctors = await this.doctorRepository.findBy({
        id: In(doctorIds),
      });

      const clinic = this.clinicRepository.create({
        ...clinicData,
        doctors,
      });

      clinics.push(clinic);
    }

    return this.clinicRepository.save(clinics);
  }

  async findAll(search?: string, sort?: 'asc' | 'desc'): Promise<Clinic[]> {
    const where = search ? { name: ILike(`%${search}%`) } : {};

    const order = sort
      ? { name: sort.toUpperCase() as 'ASC' | 'DESC' }
      : { id: 'ASC' as const };

    return this.clinicRepository.find({
      where,
      order,
      relations: ['doctors'],
    });
  }
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

