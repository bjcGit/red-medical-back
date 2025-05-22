import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { Usuario } from 'src/auth/entities/user.entity';
import { handleCustomError } from 'src/functions/error';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  async findAll() {
    try {

      const usuarios = await this.usuarioRepository.find();

      return usuarios;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('No es posible traer los usuarios');
    }
  }

  async findOne(uid: string): Promise<Usuario> {

    try {

      const usuario = await this.usuarioRepository.findOneBy({ uid })

      if (!usuario.estado) {
        throw new BadRequestException('El usuario esta desactivado')
      } else {
        return usuario
      }
    } catch (error) {
      console.log(error)
      throw new BadRequestException(`No se encontro el ID: ${uid}`)
    }
  }

async update(uid: string, updateUsuarioDto: UpdateUserDto) {
  try {
    const usuarioExistente = await this.usuarioRepository.findOneBy({ uid });
    if (!usuarioExistente) {
      throw new NotFoundException(`No existe el usuario con ID: ${uid}`);
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
        throw new BadRequestException('El usuario no existe');
      }
    
      await this.usuarioRepository.update(uid, { estado: !usuario.estado });

      const estadoActualizado = usuario.estado ? 'desactivado' : 'activado';
      return { mensaje: `Usuario ${estadoActualizado} correctamente` };
    } catch (error) {
      console.error(error);
      throw new BadRequestException(`No se pudo cambiar el estado del usuario con el ID: ${uid}`);
    }
  }
}
