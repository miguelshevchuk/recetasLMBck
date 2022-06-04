import { LMError } from "../LMError";
import { ErrorMap } from "../ErrorMap";

export class RecetaNoPropiaException extends LMError{

    constructor(){
        super(ErrorMap.RECETA_NO_PROPIA);
    }

}