import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Tratamiento } from './tratamiento.entity';
import { ManyToOne } from 'typeorm';


@Entity()
export class Consulta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fecha!: Date;

  @Column()
  motivo!: string;

  @Column()
  mascotaId!: number;  // referencia externa a microservicio 1


  @ManyToMany(() => Tratamiento, { cascade: true })
  @JoinTable()
  tratamientos!: Tratamiento[];
}
