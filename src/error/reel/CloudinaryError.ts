import { LMError } from "../LMError";
import { ErrorMap } from "../ErrorMap";

export class CloudinaryError extends LMError{

    constructor(){
        super(ErrorMap.CLOUDINARY_ERROR);
    }

}