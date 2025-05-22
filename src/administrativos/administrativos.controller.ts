import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AdministrativosService } from './administrativos.service';
import { CreateAdministrativoDto } from './dto/create-administrativo.dto';
import { UpdateAdministrativoDto } from './dto/update-administrativo.dto';

@Controller('administrativos')
export class AdministrativosController {
  constructor(private readonly administrativosService: AdministrativosService) {}

  @Post()
  create(@Body() createAdministrativoDto: CreateAdministrativoDto) {
    return this.administrativosService.create(createAdministrativoDto);
  }

  @Get()
  findAll() {
    return this.administrativosService.findAll();
  }

  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.administrativosService.findOne(uid);
  }

  @Patch(':uid')
  update(@Param('uid') uid: string, @Body() updateAdministrativoDto: UpdateAdministrativoDto) {
    return this.administrativosService.update(uid, updateAdministrativoDto);
  }

  @Delete(':uid')
  remove(@Param('uid') uid: string) {
    return this.administrativosService.remove(uid);
  }
}
