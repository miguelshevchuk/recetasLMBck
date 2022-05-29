import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    OneToMany,
    Unique
  } from 'typeorm'
import { Usuario } from '../Models'
import { Calificacion } from './Calificacion'
import { Categoria } from './Categoria'
import { Ingrediente } from './Ingrediente'
import { Paso } from './Paso'

@Entity({
    name : 'RECETAS'
})
export class Receta {

    @PrimaryGeneratedColumn({name: 'receta_id'})
    recetaId!: number

    @Column({
        name: 'nombre'
    })
    nombre!: string

  
    @Column({
        name: 'descripcion'
    })
    descripcion!: string
 
    @Column({
        name: 'dificultad'
    })
    dificultad!: number

    @Column({
        name: 'imagen'
    })
    imagen!: string

    @ManyToOne(() => Usuario)
    @JoinColumn({name: 'usuario_id'})
    usuario: Usuario;

    @ManyToOne(() => Categoria)
    @JoinColumn({name: 'categoria_id'})
    categoria: Categoria;

    @OneToMany(() => Ingrediente, ing => ing.receta)
    ingredientes!: Ingrediente[];  

    @OneToMany(() => Paso, paso => paso.receta)
    pasos!: Paso[];  

    @OneToMany(() => Calificacion, cal => cal.receta)
    calificaciones!: Calificacion[];  
   
 
}
