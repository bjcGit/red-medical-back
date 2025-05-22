import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesionalesService } from './profesionales.service';
import { ProfesionalesController } from './profesionales.controller';
import { Profesional } from './entities/profesional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profesional])],
  controllers: [ProfesionalesController],
  providers: [ProfesionalesService],
  exports: [ProfesionalesService, TypeOrmModule],
})
export class ProfesionalesModule {}
