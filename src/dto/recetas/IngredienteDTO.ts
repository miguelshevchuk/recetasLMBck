import { Ingrediente } from "../../model/recetas/Ingrediente"

export class IngredienteDTO {

    ingredienteId!: number
    ingrediente!: string

    constructor(ingrediente:Ingrediente){
        this.ingredienteId = ingrediente.ingredienteId
        this.ingrediente = ingrediente.ingrediente
    }
 
}
