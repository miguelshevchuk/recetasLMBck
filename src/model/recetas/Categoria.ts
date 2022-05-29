import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    Unique
  } from 'typeorm'

@Entity({
    name : 'CATEGORIAS'
})
export class Categoria {

    @PrimaryGeneratedColumn({name: 'categoria_id'})
    categoriaId!: number

    @Column({
        name: 'categoria'
    })
    categoria!: string
 
}
