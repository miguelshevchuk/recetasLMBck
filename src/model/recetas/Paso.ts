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
        name: 'pasoNro'
    })
    pasoNro!: number

    @Column({
        name: 'paso'
    })
    paso!: string

    @ManyToOne(() => Receta)
    @JoinColumn({name: 'receta_id'})
    receta: Receta;

    constructor(pasoNro, paso, recetaId:number){
        this.pasoNro = pasoNro
        this.paso = paso
        this.receta = new Receta(recetaId)
    }
 
}
