import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { Cita } from './entities/cita.entity';
import { SedesModule } from 'src/sedes/sedes.module';
import { Usuario } from 'src/auth/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cita, Usuario]),
  AuthModule,
  SedesModule
],
  controllers: [CitasController],
  providers: [CitasService],
  exports: [CitasService, TypeOrmModule],
})
export class CitasModule {}
