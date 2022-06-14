import { Receta} from "../../model/Models"
import { UsuarioDTO } from "../usuario/UsuarioDTO"
import { CategoriaDTO } from "./CategoriaDTO"
import { IngredienteDTO } from "./IngredienteDTO"
import { PasoDTO } from "./PasoDTO"

export class RecetaDTO {

    id!: number
    nombre!: string
    descripcion!: string
    dificultad!: number
    imagen!: string
    usuario: UsuarioDTO;
    calificacionPromedio: number = 0;
    categoria: CategoriaDTO;
    ingredientes!: string[];  
    preparacion!: PasoDTO[];  

    constructor(receta:Receta){
        this.id = receta.recetaId
        this.nombre = receta.nombre
        this.descripcion = receta.descripcion
        this.dificultad = receta.dificultad
        this.imagen = receta.imagen

        if(receta.calificaciones && receta.calificaciones.length > 0){
            let calificacionesTotales = receta.calificaciones
                .map( c => c.calificacion)
                .reduce((previous, current) => current += previous);
            this.calificacionPromedio = calificacionesTotales/receta.calificaciones.length
        }

        this.categoria = new CategoriaDTO(receta.categoria)
        this.ingredientes = receta.ingredientes.map(i => i.ingrediente)
        this.preparacion = receta.pasos.map(p => new PasoDTO(p))
        this.usuario = new UsuarioDTO(receta.usuario)
    }



}
