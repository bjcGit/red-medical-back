import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from 'src/auth/entities/user.entity';

@Entity('historias_clinicas')
export class HistoriaClinica {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'paciente_uid' })
  paciente: Usuario;
  
  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'profesional_uid' })
  profesional: Usuario;

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
