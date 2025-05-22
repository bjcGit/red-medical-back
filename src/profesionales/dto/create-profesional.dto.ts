import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsBoolean } from 'class-validator';

export class CreateProfesionalDto {
  @ApiProperty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsString()
  apellido: string;

  @ApiProperty()
  @IsString()
  cedula: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  correo?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  direccion?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  especialidad?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  registro_profesional?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
