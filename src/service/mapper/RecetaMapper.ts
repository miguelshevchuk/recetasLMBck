import { INuevaReceta } from "../../interfaces/recetas/INuevaReceta";
import { IUpdateReceta } from "../../interfaces/recetas/IUpdateReceta";
import { Receta, Usuario} from "../../model/Models";

var objectMapper = require('object-mapper');

class RecetaMapper{

    private defReceta = {
        "nombre": "nombre",
        "descripcion": "descripcion",
        "dificultad": "dificultad",
        "categoria": "categoria"
      };


    public mapNuevaReceta : (receta:INuevaReceta, userId:number, urlImagen:string) => Receta = function(receta, userId:number, urlImagen:string){

        let nuevaReceta:Receta = Object.assign(new Receta(null), objectMapper(receta, this.defReceta));

        nuevaReceta.usuario = new Usuario(userId)
        nuevaReceta.imagen = urlImagen
        nuevaReceta.estado = "ALTA"

        return nuevaReceta

    }

}

const recetaMapper = new RecetaMapper()
export default recetaMapper