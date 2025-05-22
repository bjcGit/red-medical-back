import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministrativosService } from './administrativos.service';
import { AdministrativosController } from './administrativos.controller';
import { Administrativo } from './entities/administrativo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Administrativo])],
  controllers: [AdministrativosController],
  providers: [AdministrativosService],
  exports: [AdministrativosService],
})
export class AdministrativosModule {}
