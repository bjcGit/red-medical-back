import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SedesModule } from 'src/sedes/sedes.module';


@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports:[ 
    AuthModule,
    SedesModule
  ],
  exports: [UsuariosService],
})
export class UsuariosModule {}
