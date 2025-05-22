import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from '../../pacientes/entities/paciente.entity';
import { Profesional } from '../../profesionales/entities/profesional.entity';

@Entity('historias_clinicas')
export class HistoriaClinica {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @ManyToOne(() => Paciente, { eager: true })
  @JoinColumn({ name: 'paciente_uid' })
  paciente: Paciente;

  @ManyToOne(() => Profesional, { eager: true })
  @JoinColumn({ name: 'profesional_uid' })
  profesional: Profesional;

  @Column('date')
  fecha: Date;

  @Column('text')
  motivo_consulta: string;

  @Column('text', { nullable: true })
  antecedentes: string;

  @Column('text', { nullable: true })
  diagnostico: string;

  @Column('text', { nullable: true })
  tratamiento: string;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn({ nullable: true })
  fecha_modificacion: Date;
}
