import { LMError } from "../LMError";
import { ErrorMap } from "../ErrorMap";

export class NoExistenRecetasException extends LMError{

    constructor(){
        super(ErrorMap.USUARIO_INEXISTENTE);
    }

}