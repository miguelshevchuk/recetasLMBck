import { Usuario} from "../../model/Models"

export class UsuarioDTO {

    usuarioId!: number
    email!: string
    nombre!: string

    constructor(usuario:Usuario){
        this.email = usuario.email
        this.nombre = usuario.nombreApellido
        this.usuarioId = usuario.usuarioId
    }



}
