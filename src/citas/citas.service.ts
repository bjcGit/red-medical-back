import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './entities/cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { SedesService } from '../sedes/sedes.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Sede } from 'src/sedes/entities/sede.entity';
import { Usuario } from 'src/auth/entities/user.entity';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,

    @InjectRepository(Usuario)
    private readonly usuariosService: UsuariosService,

    @InjectRepository(Sede)
    private readonly sedesService: SedesService,
  ) {}

async create(createCitaDto: CreateCitaDto): Promise<Cita> {
  const paciente = await this.usuariosService.findOne(createCitaDto.paciente_uid);
  const profesional = await this.usuariosService.findOne(createCitaDto.profesional_uid);
  const sede = await this.sedesService.findOne(createCitaDto.sede_uid);

  if (!paciente || paciente.rol !== 'PACIENTE') {
    throw new BadRequestException('Paciente inválido o no es del rol PACIENTE');
  }

  if (!profesional || profesional.rol !== 'PROFESIONAL') {
    throw new BadRequestException('Profesional inválido o no es del rol PROFESIONAL');
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
