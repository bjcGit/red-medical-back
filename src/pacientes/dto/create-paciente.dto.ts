import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsDateString, IsBoolean } from 'class-validator';

export class CreatePacienteDto {
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
  @IsDateString()
  @IsOptional()
  fecha_nacimiento?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  sexo?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
