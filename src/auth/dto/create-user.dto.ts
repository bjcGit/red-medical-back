import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsJSON, IsNumber, IsObject, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsString({message: 'El rol es obligatorio'})
    rol: string


    @ApiProperty()
    @IsString({
        message: 'El nombre es campo requerido'
    })
    nombre: string;

    @ApiProperty()
    @IsString({
        message: 'El sexo es campo requerido'
    })
    @IsOptional()
    sexo?: string;

    @ApiProperty()
    @IsString({
        message: 'La fecha de nacimiento es campo requerido'
    })
    @IsOptional()
    fecha_nacimiento?: string;

    @ApiProperty()
    @IsString({
        message: 'La fecha de ingreso es campo requerido'
    })
    @IsOptional()
    fecha_ingreso?: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    registro?: number;

    @ApiProperty()
    @IsNumber()
    cedula: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    telefono?: string;

    @ApiProperty()
    @IsString({
        message: 'El username debe ser una cadena de texto'
    })
    @IsOptional()
    username?: string;

    @ApiProperty()
    @IsString({
        message: 'El correo es obligatorio'
    })
    correo: string;

    @ApiProperty()
    @IsString({
        message: 'La direccion debe ser una cadena de texto'
    })
    @IsOptional()
    direccion?: string;

    @ApiProperty()
    @IsString({
        message: 'La direccion debe ser una cadena de texto'
    })
    @IsOptional()
    eps?: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    creado_por?: number

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    modificado_por?: number

    @ApiProperty()
    @IsString()
    @IsOptional()
    isEstado?: string

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    estado?: boolean


}
