import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesional } from './entities/profesional.entity';
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { UpdateProfesionalDto } from './dto/update-profesional.dto';

@Injectable()
export class ProfesionalesService {
  constructor(
    @InjectRepository(Profesional)
    private readonly profesionalRepository: Repository<Profesional>,
  ) {}

  async create(createProfesionalDto: CreateProfesionalDto): Promise<Profesional> {
    try {
      const profesional = this.profesionalRepository.create(createProfesionalDto);
      await this.profesionalRepository.save(profesional);
      return profesional;
    } catch (error) {
      throw new BadRequestException('No se pudo crear el profesional');
    }
  }

  async findAll(): Promise<Profesional[]> {
    return this.profesionalRepository.find();
  }

  async findOne(uid: string): Promise<Profesional> {
    const profesional = await this.profesionalRepository.findOneBy({ uid });
    if (!profesional) {
      throw new NotFoundException('Profesional no encontrado');
    }
    return profesional;
  }

  async update(uid: string, updateProfesionalDto: UpdateProfesionalDto): Promise<Profesional> {
    const profesional = await this.profesionalRepository.findOneBy({ uid });
    if (!profesional) {
      throw new NotFoundException('Profesional no encontrado');
    }
    const actualizado = this.profesionalRepository.merge(profesional, updateProfesionalDto);
    await this.profesionalRepository.save(actualizado);
    return actualizado;
  }

  async remove(uid: string): Promise<void> {
    const profesional = await this.profesionalRepository.findOneBy({ uid });
    if (!profesional) {
      throw new NotFoundException('Profesional no encontrado');
    }
    await this.profesionalRepository.remove(profesional);
  }
}
