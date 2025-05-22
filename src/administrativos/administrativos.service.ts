import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrativo } from './entities/administrativo.entity';
import { CreateAdministrativoDto } from './dto/create-administrativo.dto';
import { UpdateAdministrativoDto } from './dto/update-administrativo.dto';

@Injectable()
export class AdministrativosService {
  constructor(
    @InjectRepository(Administrativo)
    private readonly administrativoRepository: Repository<Administrativo>,
  ) {}

  async create(createAdministrativoDto: CreateAdministrativoDto): Promise<Administrativo> {
    try {
      const administrativo = this.administrativoRepository.create(createAdministrativoDto);
      await this.administrativoRepository.save(administrativo);
      return administrativo;
    } catch (error) {
      throw new BadRequestException('No se pudo crear el administrativo');
    }
  }

  async findAll(): Promise<Administrativo[]> {
    return this.administrativoRepository.find();
  }

  async findOne(uid: string): Promise<Administrativo> {
    const administrativo = await this.administrativoRepository.findOneBy({ uid });
    if (!administrativo) {
      throw new NotFoundException('Administrativo no encontrado');
    }
    return administrativo;
  }

  async update(uid: string, updateAdministrativoDto: UpdateAdministrativoDto): Promise<Administrativo> {
    const administrativo = await this.administrativoRepository.findOneBy({ uid });
    if (!administrativo) {
      throw new NotFoundException('Administrativo no encontrado');
    }
    const actualizado = this.administrativoRepository.merge(administrativo, updateAdministrativoDto);
    await this.administrativoRepository.save(actualizado);
    return actualizado;
  }

  async remove(uid: string): Promise<void> {
    const administrativo = await this.administrativoRepository.findOneBy({ uid });
    if (!administrativo) {
      throw new NotFoundException('Administrativo no encontrado');
    }
    await this.administrativoRepository.remove(administrativo);
  }
}
