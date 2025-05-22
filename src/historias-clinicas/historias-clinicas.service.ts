import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HistoriaClinica } from "./entities/historia-clinica.entity";
import { CreateHistoriaClinicaDto } from "./dto/create-historia-clinica.dto";
import { UpdateHistoriaClinicaDto } from "./dto/update-historia-clinica.dto";
import { Usuario } from "src/auth/entities/user.entity";
import { UsuariosService } from "src/usuarios/usuarios.service";

@Injectable()
export class HistoriasClinicasService {
  constructor(
    @InjectRepository(HistoriaClinica)
    private readonly historiaClinicaRepository: Repository<HistoriaClinica>,

    @InjectRepository(Usuario)
    private readonly usuariosService: UsuariosService
  ) {}

  async create(
    createHistoriaClinicaDto: CreateHistoriaClinicaDto
  ): Promise<HistoriaClinica> {
    const paciente = await this.usuariosService.findOne(
      createHistoriaClinicaDto.paciente_uid
    );
    const profesional = await this.usuariosService.findOne(
      createHistoriaClinicaDto.profesional_uid
    );

    if (!paciente || paciente.rol !== "PACIENTE") {
      throw new BadRequestException("Paciente inválido o con rol incorrecto");
    }

    if (!profesional || profesional.rol !== "PROFESIONAL") {
      throw new BadRequestException(
        "Profesional inválido o con rol incorrecto"
      );
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
      throw new BadRequestException("No se pudo crear la historia clínica");
    }
  }

  async findAll(): Promise<HistoriaClinica[]> {
    return this.historiaClinicaRepository.find();
  }

  async findOne(uid: string): Promise<HistoriaClinica> {
    const historia = await this.historiaClinicaRepository.findOneBy({ uid });
    if (!historia) {
      throw new NotFoundException("Historia clínica no encontrada");
    }
    return historia;
  }

  async update(
    uid: string,
    updateHistoriaClinicaDto: UpdateHistoriaClinicaDto
  ): Promise<HistoriaClinica> {
    const historia = await this.historiaClinicaRepository.findOneBy({ uid });
    if (!historia) {
      throw new NotFoundException("Historia clínica no encontrada");
    }
    const actualizada = this.historiaClinicaRepository.merge(
      historia,
      updateHistoriaClinicaDto
    );
    await this.historiaClinicaRepository.save(actualizada);
    return actualizada;
  }

  async remove(uid: string): Promise<void> {
    const historia = await this.historiaClinicaRepository.findOneBy({ uid });
    if (!historia) {
      throw new NotFoundException("Historia clínica no encontrada");
    }
    await this.historiaClinicaRepository.remove(historia);
  }
}
