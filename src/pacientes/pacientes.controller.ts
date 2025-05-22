import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.create(createPacienteDto);
  }

  @Get()
  findAll() {
    return this.pacientesService.findAll();
  }

  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.pacientesService.findOne(uid);
  }

  @Patch(':uid')
  update(@Param('uid') uid: string, @Body() updatePacienteDto: UpdatePacienteDto) {
    return this.pacientesService.update(uid, updatePacienteDto);
  }

  @Delete(':uid')
  remove(@Param('uid') uid: string) {
    return this.pacientesService.remove(uid);
  }
}
