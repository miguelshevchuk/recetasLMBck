import { Paso } from "../../model/Models"


export class PasoDTO {

    pasoId!: number
    paso!: string

    constructor(paso:Paso){
        this.pasoId = paso.pasoId
        this.paso = paso.paso
    }
 
}
