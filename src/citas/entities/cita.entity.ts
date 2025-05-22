import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from '../../pacientes/entities/paciente.entity';
import { Profesional } from '../../profesionales/entities/profesional.entity';
import { Sede } from '../../sedes/entities/sede.entity';

@Entity('citas')
export class Cita {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @ManyToOne(() => Paciente, { eager: true })
  @JoinColumn({ name: 'paciente_uid' })
  paciente: Paciente;

  @ManyToOne(() => Profesional, { eager: true })
  @JoinColumn({ name: 'profesional_uid' })
  profesional: Profesional;

  @ManyToOne(() => Sede, { eager: true })
  @JoinColumn({ name: 'sede_uid' })
  sede: Sede;

  @Column('timestamp')
  fecha_hora: Date;

  @Column('varchar', { nullable: true })
  motivo: string;

  @Column('varchar', { nullable: true })
  estado: string;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn({ nullable: true })
  fecha_modificacion: Date;
}
