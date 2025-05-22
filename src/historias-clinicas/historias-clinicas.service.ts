import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoriaClinica } from './entities/historia-clinica.entity';
import { CreateHistoriaClinicaDto } from './dto/create-historia-clinica.dto';
import { UpdateHistoriaClinicaDto } from './dto/update-historia-clinica.dto';
import { PacientesService } from '../pacientes/pacientes.service';
import { ProfesionalesService } from '../profesionales/profesionales.service';

@Injectable()
export class HistoriasClinicasService {
  constructor(
    @InjectRepository(HistoriaClinica)
    private readonly historiaClinicaRepository: Repository<HistoriaClinica>,
    private readonly pacientesService: PacientesService,
    private readonly profesionalesService: ProfesionalesService,
  ) {}

  async create(createHistoriaClinicaDto: CreateHistoriaClinicaDto): Promise<HistoriaClinica> {
    // Validar existencia de paciente y profesional
    const paciente = await this.pacientesService.findOne(createHistoriaClinicaDto.paciente_uid);
    const profesional = await this.profesionalesService.findOne(createHistoriaClinicaDto.profesional_uid);
    if (!paciente || !profesional) {
      throw new BadRequestException('Paciente o profesional no válidos');
    }
    try {
      const historia = this.historiaClinicaRepository.create({
        ...createHistoriaClinicaDto,
        paciente,
        profesional,
      });
      await this.historiaClinicaRepository.save(historia);
      return historia;
    } catch (error) {
      throw new BadRequestException('No se pudo crear la historia clínica');
    }
  }

  async findAll(): Promise<HistoriaClinica[]> {
    return this.historiaClinicaRepository.find();
  }

  async findOne(uid: string): Promise<HistoriaClinica> {
    const historia = await this.historiaClinicaRepository.findOneBy({ uid });
    if (!historia) {
      throw new NotFoundException('Historia clínica no encontrada');
    }
    return historia;
  }

  async update(uid: string, updateHistoriaClinicaDto: UpdateHistoriaClinicaDto): Promise<HistoriaClinica> {
    const historia = await this.historiaClinicaRepository.findOneBy({ uid });
    if (!historia) {
      throw new NotFoundException('Historia clínica no encontrada');
    }
    const actualizada = this.historiaClinicaRepository.merge(historia, updateHistoriaClinicaDto);
    await this.historiaClinicaRepository.save(actualizada);
    return actualizada;
  }

  async remove(uid: string): Promise<void> {
    const historia = await this.historiaClinicaRepository.findOneBy({ uid });
    if (!historia) {
      throw new NotFoundException('Historia clínica no encontrada');
    }
    await this.historiaClinicaRepository.remove(historia);
  }
}
