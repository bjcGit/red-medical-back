import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { Rol } from 'src/auth/interfaces/valid-rol';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}


  @Get('')
  // @Auth(Rol.admin)
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get('/:id')
  // @Auth(Rol.admin)
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Patch('update/:id')
  // @Auth(Rol.admin)
  update(
    @Param('id') id: string, 
    @Body() updateUsuarioDto: UpdateUserDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Patch('desactivar/:id')
  // @Auth(Rol.admin)
  desactivar(@Param('id') id: string) {
    return this.usuariosService.desactivar(id);
  }
}
