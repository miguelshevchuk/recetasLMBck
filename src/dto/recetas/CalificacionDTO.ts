import { UsuarioDTO } from "../usuario/UsuarioDTO";
import { RecetaDTO } from "./RecetaDTO";

export class CalificacionDTO {

    calificacionId!: number
    calificacion!: number
    usuario: UsuarioDTO;
    receta: RecetaDTO;   
 
}
