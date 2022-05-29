import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    Unique
  } from 'typeorm'
import { Receta } from './Receta';

@Entity({
    name : 'PASOS'
})
export class Paso {

    @PrimaryGeneratedColumn({name: 'paso_id'})
    pasoId!: number

    @Column({
        name: 'paso'
    })
    paso!: string

    @ManyToOne(() => Receta)
    @JoinColumn({name: 'receta_id'})
    receta: Receta;
 
}
