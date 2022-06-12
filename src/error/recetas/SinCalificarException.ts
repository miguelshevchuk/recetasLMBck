import { LMError } from "../LMError";
import { ErrorMap } from "../ErrorMap";

export class SinCalificarException extends LMError{

    constructor(){
        super(ErrorMap.SIN_CALIFICAR);
    }

}