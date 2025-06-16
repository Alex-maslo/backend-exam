import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: +id });
    if (!user) {
      throw new NotFoundException(`User with id=${id} not found`);
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(dto);
      return await this.userRepository.save(user);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      }
      throw err;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: +id } });
    if (!user) {
      throw new NotFoundException(`User with id=${id} not found`);
    }
    const updated = this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(updated);
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete(+id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id=${id} not found`);
    }
  }
}
