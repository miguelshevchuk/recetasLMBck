import { LMError } from "../LMError";
import { ErrorMap } from "../ErrorMap";

export class NoExistenRecetasException extends LMError{

    constructor(){
        super(ErrorMap.NO_EXISTEN_RECETAS);
    }

}