
import { getRepository } from 'typeorm'
import { ILogin } from '../../interfaces/usuario/ILogin';
import { Usuario } from '../../model/Models';
import { CredencialesInvalidasError } from '../../error/auth/CredencialesInvalidasError';
import { jwtService } from '../jwt/JwtService';
import { IJwtUnsigned } from '../../interfaces/jwt/IJwtUnsigned';
import { LoginResponseDTO } from '../../dto/usuario/LoginResponseDTO';

class SesionService{
 

    public async login(login:ILogin){
        let usuarioRepository = getRepository(Usuario);
        const usuario= await usuarioRepository.findOne({email: login.usuario, password: login.password});

        if (!usuario) {
            throw new CredencialesInvalidasError()
        }

        let signObject:IJwtUnsigned = {
            usuarioId: usuario.usuarioId
        };

        return new LoginResponseDTO(usuario, jwtService.createJWT(signObject)) ;
    }


}

const sesionService = new SesionService()
export default sesionService