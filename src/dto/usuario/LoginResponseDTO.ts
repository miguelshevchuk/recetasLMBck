import { Usuario} from "../../model/Models"
import { JwtSignedDTO } from "./JwtSignedDTO"
import { UsuarioDTO } from "./UsuarioDTO"

export class LoginResponseDTO {

    usuario!: UsuarioDTO
    jwt!: JwtSignedDTO

    constructor(usuario:Usuario, jwt:JwtSignedDTO){
        this.usuario = new UsuarioDTO(usuario)
        this.jwt = jwt
    }



}
