import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('profesionales')
export class Profesional {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column('varchar')
  nombre: string;

  @Column('varchar')
  apellido: string;

  @Column('varchar', { unique: true })
  cedula: string;

  @Column('varchar', { nullable: true })
  correo: string;

  @Column('varchar', { nullable: true })
  telefono: string;

  @Column('varchar', { nullable: true })
  direccion: string;

  @Column('varchar', { nullable: true })
  especialidad: string;

  @Column('varchar', { nullable: true })
  registro_profesional: string;

  @Column('boolean', { default: true })
  estado: boolean;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn({ nullable: true })
  fecha_modificacion: Date;
}
