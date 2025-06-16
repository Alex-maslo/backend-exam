import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  @MinLength(2)
  @MaxLength(50)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;
}
