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
    name : 'INGREDIENTES'
})
export class Ingrediente {

    @PrimaryGeneratedColumn({name: 'ingrediente_id'})
    ingredienteId!: number

    @Column({
        name: 'ingrediente'
    })
    ingrediente!: string

    @ManyToOne(() => Receta)
    @JoinColumn({name: 'receta_id'})
    receta: Receta;

    constructor(ingrediente:string, recetaId:number){
        this.ingrediente = ingrediente
        this.receta = new Receta(recetaId)
    }
 
}
