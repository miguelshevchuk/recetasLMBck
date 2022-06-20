
import { getRepository } from 'typeorm'
import { ILogin } from '../../interfaces/usuario/ILogin';
import { Usuario } from '../../model/Models';
import { CredencialesInvalidasError } from '../../error/auth/CredencialesInvalidasError';
import { jwtService } from '../jwt/JwtService';
import { IJwtUnsigned } from '../../interfaces/jwt/IJwtUnsigned';
import { LoginResponseDTO } from '../../dto/usuario/LoginResponseDTO';
import bcrypt from 'bcryptjs'

class SesionService{
 

    public async login(login:ILogin){
        let usuarioRepository = getRepository(Usuario);
        console.log(bcrypt.hashSync(login.password, 8))
        const usuario= await usuarioRepository.findOne({email: login.usuario});

        if (!usuario) {
            throw new CredencialesInvalidasError()
        }

        if(!bcrypt.compare(login.password, usuario.password)){
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