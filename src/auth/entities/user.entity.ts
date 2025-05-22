
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {

  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column('varchar')
  rol: string;

  @Column('varchar')
  nombre: string;

  @Column('varchar')
  sexo: string;

  @Column('varchar', { nullable: true, default: 'No registra' })
  fecha_nacimiento: string;

  @Column('varchar', { nullable: true, default: 'No registra' })
  fecha_ingreso: string;

  @Column('int')
  registro: number;

  @Column('varchar', { unique: true })
  cedula: string;

  @Column('varchar', {
    unique: true, nullable: true, default: 'No registra',
  })
  username: string;

  @Column('varchar', { unique: true })
  correo: string;

  @Column('varchar', { nullable: true, default: 'No registra' })
  telefono: string;

  @Column('varchar', { nullable: true, default: 'No registra' })
  direccion: string;

  @Column('varchar', { nullable: true, default: 'No registra' })
  eps: string;

  @Column('varchar', { nullable: true, default: 'Activo' })
  isEstado: string;

  @Column('int', { nullable: true, default: 1 })
  creado_por: number;

  @Column('int', { nullable: true, default: 1 })
  modificado_por: number;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn({nullable: true})
  fecha_modificacion: Date;

  @Column('boolean', {
    default: true,
  })
  estado: boolean;

}
