import { LMError } from "../LMError";
import { ErrorMap } from "../ErrorMap";

export class CredencialesInvalidasError extends LMError{

    constructor(){
        super(ErrorMap.CREDENCIALES_INVALIDAS);
    }

}