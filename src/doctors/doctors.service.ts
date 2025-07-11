import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { Treatment } from '../treatments/entities/treatment.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    @InjectRepository(Treatment)
    private readonly treatmentRepository: Repository<Treatment>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const { treatmentIds = [], ...doctorData } = createDoctorDto;
    const treatments = await this.treatmentRepository.findBy({
      id: In(treatmentIds),
    });

    const doctor = this.doctorRepository.create({
      ...doctorData,
      treatments,
    });

    return this.doctorRepository.save(doctor);
  }

  async createMany(createDoctorDto: CreateDoctorDto[]): Promise<Doctor[]> {
    const doctor = this.doctorRepository.create(createDoctorDto);
    return await this.doctorRepository.save(doctor);
  }

  async findAll(
    search?: string,
    sort: 'id' | 'firstName' | 'lastName' = 'id',
    order: 'asc' | 'desc' = 'asc',
  ): Promise<Doctor[]> {
    const query = this.doctorRepository.createQueryBuilder('doctor');

    if (search) {
      query.where([
        { firstName: ILike(`%${search}%`) },
        { lastName: ILike(`%${search}%`) },
        { phone: ILike(`%${search}%`) },
        { email: ILike(`%${search}%`) },
      ]);
    }

    query.orderBy(`doctor.${sort}`, order.toUpperCase() as 'ASC' | 'DESC');

    return await query.getMany();
  }
}
