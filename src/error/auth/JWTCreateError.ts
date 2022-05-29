import { LMError } from "../LMError";
import { ErrorMap } from "../ErrorMap";

export class JWTCreateError extends LMError{

    constructor(){
        super(ErrorMap.JWT_CREATE);
    }

}