import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProfesionalesService } from './profesionales.service';
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { UpdateProfesionalDto } from './dto/update-profesional.dto';

@Controller('profesionales')
export class ProfesionalesController {
  constructor(private readonly profesionalesService: ProfesionalesService) {}

  @Post()
  create(@Body() createProfesionalDto: CreateProfesionalDto) {
    return this.profesionalesService.create(createProfesionalDto);
  }

  @Get()
  findAll() {
    return this.profesionalesService.findAll();
  }

  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.profesionalesService.findOne(uid);
  }

  @Patch(':uid')
  update(@Param('uid') uid: string, @Body() updateProfesionalDto: UpdateProfesionalDto) {
    return this.profesionalesService.update(uid, updateProfesionalDto);
  }

  @Delete(':uid')
  remove(@Param('uid') uid: string) {
    return this.profesionalesService.remove(uid);
  }
}
