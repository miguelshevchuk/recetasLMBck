import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    JoinColumn
  } from 'typeorm'
import { Usuario } from '../Models'
import { Receta } from './Receta'

@Entity({
    name : 'CALIFICACIONES'
})
export class Calificacion {

    @PrimaryGeneratedColumn({name: 'calificacion_id'})
    calificacionId!: number

    @Column({
        name: 'calificacion'
    })
    calificacion!: number

    @ManyToOne(() => Usuario)
    @JoinColumn({name: 'usuario_id'})
    usuario: Usuario;

    @ManyToOne(() => Receta)
    @JoinColumn({name: 'receta_id'})
    receta: Receta;   
 
}
