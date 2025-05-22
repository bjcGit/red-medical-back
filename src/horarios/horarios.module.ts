import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorariosService } from './horarios.service';
import { HorariosController } from './horarios.controller';
import { Horario } from './entities/horario.entity';
import { ProfesionalesModule } from '../profesionales/profesionales.module';

@Module({
  imports: [TypeOrmModule.forFeature([Horario]), ProfesionalesModule],
  controllers: [HorariosController],
  providers: [HorariosService],
  exports: [HorariosService],
})
export class HorariosModule {}
