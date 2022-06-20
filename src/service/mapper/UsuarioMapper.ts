import { INuevoUsuario } from "../../interfaces/usuario/INuevoUsuario";
import { Usuario} from "../../model/Models";
import bcrypt from 'bcryptjs'

var objectMapper = require('object-mapper');

class UsuarioMapper{

    private defNuevoUsuarioMapper = {
        "password": "password",
        "email": "email",
        "nombreApellido": "nombreApellido",
        "telefono": "telefono"        
      };

    public mapNuevoUsuario : (nuevoUsuario:INuevoUsuario) => Usuario = function(nuevoUsuario){
        
        nuevoUsuario.password = bcrypt.hashSync(nuevoUsuario.password, 8)

        return Object.assign(new Usuario(null), objectMapper(nuevoUsuario, this.defNuevoUsuarioMapper));

    }

}

const usuarioMapper = new UsuarioMapper()
export default usuarioMapper