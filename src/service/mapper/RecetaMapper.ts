import { IUpdateReceta } from "../../interfaces/recetas/IUpdateReceta";
import { Receta} from "../../model/Models";

var objectMapper = require('object-mapper');

class RecetaMapper{

    private defReceta = {
        "recetaId": "recetaId",
        "nombre": "nombre",
        "descripcion": "descripcion",
        "dificultad": "dificultad",
        "categoria": "categoria"
      };

    public mapReceta : (receta:IUpdateReceta) => Receta = function(receta){

        return Object.assign(new Receta(), objectMapper(receta, this.defReceta));

    }

}

const recetaMapper = new RecetaMapper()
export default recetaMapper