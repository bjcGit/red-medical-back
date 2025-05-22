import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsBoolean } from 'class-validator';

export class CreateAdministrativoDto {
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
  cargo?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
