import { LMError } from "../LMError";
import { ErrorMap } from "../ErrorMap";

export class UsuarioInexistenteError extends LMError{

    constructor(){
        super(ErrorMap.USUARIO_INEXISTENTE);
    }

}