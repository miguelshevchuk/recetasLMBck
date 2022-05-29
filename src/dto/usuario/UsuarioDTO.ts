import { Usuario} from "../../model/Models"

export class UsuarioDTO {

    email!: string
    nombre!: string

    constructor(usuario:Usuario){
        this.email = usuario.email
        this.nombre = usuario.nombreApellido
    }



}
