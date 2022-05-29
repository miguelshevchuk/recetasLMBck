import { LMError } from "../LMError";
import { ErrorMap } from "../ErrorMap";

export class UsuarioExistenteError extends LMError{

    constructor(){
        super(ErrorMap.USUARIO_EXISTENTE);
    }

}