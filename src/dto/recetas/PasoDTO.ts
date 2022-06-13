import { Paso } from "../../model/Models"


export class PasoDTO {

    paso!: number
    descripcion!: string

    constructor(paso:Paso){
        this.paso = paso.pasoNro
        this.descripcion = paso.paso
    }
 
}
