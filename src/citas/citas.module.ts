import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { Cita } from './entities/cita.entity';
import { ProfesionalesModule } from 'src/profesionales/profesionales.module';
import { SedesModule } from 'src/sedes/sedes.module';
import { PacientesModule } from 'src/pacientes/pacientes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cita]),
  ProfesionalesModule,
  SedesModule,
  PacientesModule
],
  controllers: [CitasController],
  providers: [CitasService],
  exports: [CitasService, TypeOrmModule],
})
export class CitasModule {}
