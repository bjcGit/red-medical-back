import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('sedes')
export class Sede {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column('varchar')
  nombre: string;

  @Column('varchar')
  direccion: string;

  @Column('varchar', { nullable: true })
  telefono: string;

  @Column('varchar', { nullable: true })
  ciudad: string;

  @Column('varchar', { nullable: true })
  departamento: string;

  @Column('boolean', { default: true })
  estado: boolean;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn({ nullable: true })
  fecha_modificacion: Date;
}
