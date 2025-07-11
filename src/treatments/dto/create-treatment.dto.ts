import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateTreatmentDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
