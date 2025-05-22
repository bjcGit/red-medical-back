import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriasClinicasService } from './historias-clinicas.service';
import { HistoriasClinicasController } from './historias-clinicas.controller';
import { HistoriaClinica } from './entities/historia-clinica.entity';
import { PacientesModule } from '../pacientes/pacientes.module';
import { ProfesionalesModule } from '../profesionales/profesionales.module';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriaClinica]), PacientesModule, ProfesionalesModule],
  controllers: [HistoriasClinicasController],
  providers: [HistoriasClinicasService],
  exports: [HistoriasClinicasService],
})
export class HistoriasClinicasModule {}
