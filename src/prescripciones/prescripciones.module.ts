import { Module } from '@nestjs/common';
import { PrescripcionesService } from './prescripciones.service';
import { PrescripcionesController } from './prescripciones.controller';

@Module({
  controllers: [PrescripcionesController],
  providers: [PrescripcionesService],
})
export class PrescripcionesModule {}
