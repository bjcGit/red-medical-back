
import { Sede } from 'src/sedes/entities/sede.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {

  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ unique: true })
  correo: string;

  @Column({ nullable: true, select: false })
  password?: string;

  @Column()
  nombre: string;

  @Column('varchar', { default: 'PACIENTE' })
  rol: string;

  @Column('varchar', { unique: true })
  cedula: string;

  @Column({ nullable: true })
  telefono?: string;

  @Column({ nullable: true })
  direccion?: string;

  @Column({ nullable: true })
  sexo?: string;

  @Column({ nullable: true })
  fecha_nacimiento?: Date;

  @Column({ nullable: true })
  especialidad?: string;

  @Column({ nullable: true })
  registro_profesional?: string;

  @Column({ nullable: true })
  cargo?: string;

  @Column({ nullable: true })
  eps?: string;

  @Column({ default: true })
  estado: boolean;

  @Column({ nullable: true })
  isEstado?: string;

  @ManyToOne(() => Sede, { nullable: true, eager: true })
  @JoinColumn({ name: 'sede_id' })
  sede?: Sede;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn({ nullable: true })
  fecha_modificacion: Date;
}