import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClinicDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  doctorIds: number[];
}
