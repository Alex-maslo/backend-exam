import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

interface QueryFailedError extends Error {
  code?: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const user = this.userRepository.create(registerUserDto);
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      const queryFailedError = error as QueryFailedError;
      if (queryFailedError.code === '23505') {
        throw new ConflictException('Email вже використовується');
      }
      throw error;
    }
  }
}
