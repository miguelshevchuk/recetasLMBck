import { Usuario} from "../../model/Models"

export class UsuarioDTO {

    id!: number
    email!: string
    nombre!: string

    constructor(usuario:Usuario){
        this.email = usuario.email
        this.nombre = usuario.nombreApellido
        this.id = usuario.usuarioId
    }



}
