import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @Matches(/^\+?\d{7,15}$/, {
    message: 'Телефон повинен містити від 7 до 15 цифр, може починатися з +',
  })
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  specialization?: string;
}
