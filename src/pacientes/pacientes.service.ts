import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async create(createPacienteDto: CreatePacienteDto): Promise<Paciente> {
    try {
      const paciente = this.pacienteRepository.create(createPacienteDto);
      await this.pacienteRepository.save(paciente);
      return paciente;
    } catch (error) {
      throw new BadRequestException('No se pudo crear el paciente');
    }
  }

  async findAll(): Promise<Paciente[]> {
    return this.pacienteRepository.find();
  }

  async findOne(uid: string): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOneBy({ uid });
    if (!paciente) {
      throw new NotFoundException('Paciente no encontrado');
    }
    return paciente;
  }

  async update(uid: string, updatePacienteDto: UpdatePacienteDto): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOneBy({ uid });
    if (!paciente) {
      throw new NotFoundException('Paciente no encontrado');
    }
    const actualizado = this.pacienteRepository.merge(paciente, updatePacienteDto);
    await this.pacienteRepository.save(actualizado);
    return actualizado;
  }

  async remove(uid: string): Promise<void> {
    const paciente = await this.pacienteRepository.findOneBy({ uid });
    if (!paciente) {
      throw new NotFoundException('Paciente no encontrado');
    }
    await this.pacienteRepository.remove(paciente);
  }
}
