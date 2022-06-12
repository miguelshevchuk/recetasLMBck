
import { getRepository } from 'typeorm'
import { UsuarioExistenteError } from '../../error/auth/UsuarioExistenteError';
import { UsuarioInexistenteError } from '../../error/auth/UsuarioInexistenteError';
import { INuevoUsuario } from '../../interfaces/usuario/INuevoUsuario';
import usuarioMapper from '../mapper/UsuarioMapper';
import { Usuario} from '../../model/Models';
import { UsuarioDTO } from '../../dto/usuario/UsuarioDTO';
import { ICambiarPass } from '../../interfaces/usuario/ICambiarPass';
import { CredencialesInvalidasError } from '../../error/auth/CredencialesInvalidasError';

class UsuarioService{
 
    public async getUsuarioBy(userid:any){
        let usuarioRepository = getRepository(Usuario);
        const usuario= await usuarioRepository.createQueryBuilder('u')
            .where('u.usuarioId = :id', { id: userid })
            .getOne();

        if (!usuario) {
            throw new UsuarioInexistenteError()
        }

        return usuario
    }

    public async create(nuevoUsuario:INuevoUsuario){
        let usuarioRepository = getRepository(Usuario);

        let usuarioExistente = await usuarioRepository.findOne({email : nuevoUsuario.email});

        if(usuarioExistente){
            throw new UsuarioExistenteError()
        }

       await usuarioRepository.save(usuarioMapper.mapNuevoUsuario(nuevoUsuario));
    }

    public async getUsuario(userId:number){

        let usuario = await this.getUsuarioBy(userId)

        return new UsuarioDTO(usuario)
    }

    public async cambiarPass(cambiarPass:ICambiarPass, userId:number){

        let usuarioRepository = getRepository(Usuario);
        const usuario= await usuarioRepository.findOne({usuarioId: userId, password: cambiarPass.oldPassword});

        if (!usuario) {
            throw new CredencialesInvalidasError()
        }

        await usuarioRepository.update({usuarioId: userId}, {password: cambiarPass.newPassword})
    }


}

const usuarioService = new UsuarioService()
export default usuarioService