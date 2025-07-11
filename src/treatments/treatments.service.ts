import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { Treatment } from './entities/treatment.entity';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectRepository(Treatment)
    private treatmentRepository: Repository<Treatment>,
  ) {}

  // Створити одну процедуру
  async create(createDto: CreateTreatmentDto): Promise<Treatment> {
    const treatment = this.treatmentRepository.create(createDto);
    return this.treatmentRepository.save(treatment);
  }

  // Створити багато процедур масивом
  async createMany(createDto: CreateTreatmentDto[]): Promise<Treatment[]> {
    const treatments = this.treatmentRepository.create(createDto);
    return this.treatmentRepository.save(treatments);
  }

  async findAll(
    search?: string,
    sort: 'id' | 'name' = 'id',
    order: 'asc' | 'desc' = 'asc',
  ): Promise<Treatment[]> {
    const query = this.treatmentRepository.createQueryBuilder('treatment');

    if (search) {
      query.where('treatment.name ILIKE :search', { search: `%${search}%` });
    }

    query.orderBy(`treatment.${sort}`, order.toUpperCase() as 'ASC' | 'DESC');

    return query.getMany();
  }
}
