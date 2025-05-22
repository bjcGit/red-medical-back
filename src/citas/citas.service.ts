import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './entities/cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { PacientesService } from '../pacientes/pacientes.service';
import { ProfesionalesService } from '../profesionales/profesionales.service';
import { SedesService } from '../sedes/sedes.service';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
    private readonly pacientesService: PacientesService,
    private readonly profesionalesService: ProfesionalesService,
    private readonly sedesService: SedesService,
  ) {}

  async create(createCitaDto: CreateCitaDto): Promise<Cita> {
    // Validar existencia de paciente, profesional y sede
    const paciente = await this.pacientesService.findOne(createCitaDto.paciente_uid);
    const profesional = await this.profesionalesService.findOne(createCitaDto.profesional_uid);
    const sede = await this.sedesService.findOne(createCitaDto.sede_uid);
    if (!paciente || !profesional || !sede) {
      throw new BadRequestException('Paciente, profesional o sede no válidos');
    }
    try {
      const cita = this.citaRepository.create({
        ...createCitaDto,
        paciente,
        profesional,
        sede,
      });
      await this.citaRepository.save(cita);
      return cita;
    } catch (error) {
      throw new BadRequestException('No se pudo crear la cita');
    }
  }

  async findAll(): Promise<Cita[]> {
    return this.citaRepository.find();
  }

  async findOne(uid: string): Promise<Cita> {
    const cita = await this.citaRepository.findOneBy({ uid });
    if (!cita) {
      throw new NotFoundException('Cita no encontrada');
    }
    return cita;
  }

  async update(uid: string, updateCitaDto: UpdateCitaDto): Promise<Cita> {
    const cita = await this.citaRepository.findOneBy({ uid });
    if (!cita) {
      throw new NotFoundException('Cita no encontrada');
    }
    const actualizado = this.citaRepository.merge(cita, updateCitaDto);
    await this.citaRepository.save(actualizado);
    return actualizado;
  }

  async remove(uid: string): Promise<void> {
    const cita = await this.citaRepository.findOneBy({ uid });
    if (!cita) {
      throw new NotFoundException('Cita no encontrada');
    }
    await this.citaRepository.remove(cita);
  }
}
