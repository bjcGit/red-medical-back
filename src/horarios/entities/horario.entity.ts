import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Profesional } from '../../profesionales/entities/profesional.entity';

@Entity('horarios')
export class Horario {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @ManyToOne(() => Profesional, { eager: true })
  @JoinColumn({ name: 'profesional_uid' })
  profesional: Profesional;

  @Column('date')
  fecha: Date;

  @Column('time')
  hora_inicio: string;

  @Column('time')
  hora_fin: string;

  @Column('boolean', { default: true })
  disponible: boolean;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn({ nullable: true })
  fecha_modificacion: Date;
}
