import { Categoria } from "../../model/Models"

export class CategoriaDTO {

    id!: number
    descripcion!: string

    constructor(categoria:Categoria){
        this.id = categoria.categoriaId
        this.descripcion = categoria.categoria
    }
 
}
