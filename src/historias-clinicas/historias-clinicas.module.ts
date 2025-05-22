import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriasClinicasService } from './historias-clinicas.service';
import { HistoriasClinicasController } from './historias-clinicas.controller';
import { HistoriaClinica } from './entities/historia-clinica.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistoriaClinica]),
    AuthModule
  ],
  controllers: [HistoriasClinicasController],
  providers: [HistoriasClinicasService],
  exports: [HistoriasClinicasService],
})
export class HistoriasClinicasModule {}
