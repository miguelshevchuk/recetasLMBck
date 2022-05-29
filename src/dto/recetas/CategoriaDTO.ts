import { Categoria } from "../../model/Models"

export class CategoriaDTO {

    categoriaId!: number
    categoria!: string

    constructor(categoria:Categoria){
        this.categoriaId = categoria.categoriaId
        this.categoria = categoria.categoria
    }
 
}
