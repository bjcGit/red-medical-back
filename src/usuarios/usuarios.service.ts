import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateUserDto } from "src/auth/dto/update-user.dto";
import { Usuario } from "src/auth/entities/user.entity";
import { handleCustomError } from "src/functions/error";
import { Sede } from "src/sedes/entities/sede.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Sede)
    private readonly sedeRepository: Repository<Sede>
  ) {}

async findAll(filtros?: { sedeId?: string; rol?: string }) {
  try {
    const query = this.usuarioRepository.createQueryBuilder('usuario');

    if (filtros?.sedeId) {
      query.andWhere('usuario.sede = :sedeId', { sedeId: filtros.sedeId });
    }

    if (filtros?.rol) {
      query.andWhere('usuario.rol = :rol', { rol: filtros.rol });
    }

    return await query.getMany();
  } catch (error) {
    console.log(error);
    throw new BadRequestException('No es posible traer los usuarios');
  }
}

  async findOne(uid: string): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOneBy({ uid });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${uid} no encontrado`);
      }

      if (!usuario.estado) {
        throw new BadRequestException("El usuario esta desactivado");
      }

      return usuario;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`No se encontro el ID: ${uid}`);
    }
  }

async update(uid: string, updateUsuarioDto: UpdateUserDto) {
  try {
    const usuarioExistente = await this.usuarioRepository.findOneBy({ uid });
    if (!usuarioExistente) {
      throw new NotFoundException(`No existe el usuario con ID: ${uid}`);
    }

    if (updateUsuarioDto.sedeId) {
      const sede = await this.sedeRepository.findOneBy({ uid: updateUsuarioDto.sedeId });
      if (!sede) {
        throw new BadRequestException('La sede indicada no existe');
      }
      usuarioExistente.sede = sede;
    }

    const usuarioActualizado = this.usuarioRepository.merge(usuarioExistente, updateUsuarioDto);
    await this.usuarioRepository.save(usuarioActualizado);
    return usuarioActualizado;
  } catch (error) {
    console.log(error);
    throw handleCustomError(error);
  }
}


  async desactivar(uid: string) {
    try {
      const usuario = await this.usuarioRepository.findOneBy({ uid });

      if (!usuario) {
        throw new BadRequestException("El usuario no existe");
      }

      await this.usuarioRepository.update(uid, { estado: !usuario.estado });

      const estadoActualizado = usuario.estado ? "desactivado" : "activado";
      return { mensaje: `Usuario ${estadoActualizado} correctamente` };
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        `No se pudo cambiar el estado del usuario con el ID: ${uid}`
      );
    }
  }
}
