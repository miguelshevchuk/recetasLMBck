import { INuevoUsuario } from "../../interfaces/usuario/INuevoUsuario";
import { Usuario} from "../../model/Models";

var objectMapper = require('object-mapper');

class UsuarioMapper{

    private defNuevoUsuarioMapper = {
        "password": "password",
        "email": "email",
        "nombreApellido": "nombreApellido"
      };

    public mapNuevoUsuario : (nuevoUsuario:INuevoUsuario) => Usuario = function(nuevoUsuario){

        return Object.assign(new Usuario(), objectMapper(nuevoUsuario, this.defNuevoUsuarioMapper));

    }

}

const usuarioMapper = new UsuarioMapper()
export default usuarioMapper