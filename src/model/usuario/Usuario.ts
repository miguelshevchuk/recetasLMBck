import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    Unique
  } from 'typeorm'

@Entity({
    name : 'USUARIOS'
})
@Unique(["email"])
export class Usuario {

    @PrimaryGeneratedColumn({name: 'usuario_id'})
    usuarioId!: number

    @Column({
        name: 'password'
    })
    password!: string

  
    @Column({
        name: 'email'
    })
    email!: string
 
    @Column({
        name: 'nombre_apellido'
    })
    nombreApellido!: string

    @Column({
        name: 'telefono'
    })
    telefono!: string

    @Column({
        name: 'pregunta_secreta'
    })
    preguntaSecreta!: string

    @Column({
        name: 'respuesta_secreta'
    })
    respuestaSecreta!: string

    constructor(usuarioId:number){
        this.usuarioId = usuarioId
    }
   
 
}
