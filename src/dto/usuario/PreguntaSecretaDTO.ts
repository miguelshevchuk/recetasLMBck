import { Usuario} from "../../model/Models"

export class PreguntaSecretaDTO {

    id!: number
    preguntaSecreta!: string

    constructor(usuario:Usuario){
        this.preguntaSecreta = usuario.preguntaSecreta
        this.id = usuario.usuarioId
    }



}
