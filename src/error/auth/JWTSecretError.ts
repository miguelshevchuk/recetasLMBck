import { LMError } from "../LMError";
import { ErrorMap } from "../ErrorMap";

export class JWTSecretError extends LMError{

    constructor(){
        super(ErrorMap.JWT_SECRET);
    }

}