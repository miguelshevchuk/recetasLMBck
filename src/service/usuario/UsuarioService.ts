
import { getRepository } from 'typeorm'
import { UsuarioExistenteError } from '../../error/auth/UsuarioExistenteError';
import { UsuarioInexistenteError } from '../../error/auth/UsuarioInexistenteError';
import { INuevoUsuario } from '../../interfaces/usuario/INuevoUsuario';
import usuarioMapper from '../mapper/UsuarioMapper';
import { Usuario} from '../../model/Models';
import { UsuarioDTO } from '../../dto/usuario/UsuarioDTO';
import { ICambiarPass } from '../../interfaces/usuario/ICambiarPass';
import { CredencialesInvalidasError } from '../../error/auth/CredencialesInvalidasError';
import bcrypt from 'bcryptjs'
import { PreguntaSecretaDTO } from '../../dto/usuario/PreguntaSecretaDTO';
import { IRecuperoClave } from '../../interfaces/usuario/IRecuperoClave';

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
        const usuario= await usuarioRepository.findOne({usuarioId: userId});

        if (!usuario) {
            throw new CredencialesInvalidasError()
        }

        if(!bcrypt.compare(cambiarPass.oldPassword, usuario.password)){
            throw new CredencialesInvalidasError()
        }

        await usuarioRepository.update({usuarioId: userId}, {password: bcrypt.hashSync(cambiarPass.newPassword, 8)})
    }

    public async getPreguntaSecreta(email:string){

        let usuarioRepository = getRepository(Usuario);
        const usuario= await usuarioRepository.findOne({email: email});

        if (!usuario) {
            throw new CredencialesInvalidasError()
        }

        return new PreguntaSecretaDTO(usuario)
    }

    public async recuperarClave(recuperoClave:IRecuperoClave){

        let usuarioRepository = getRepository(Usuario);
        const usuario= await usuarioRepository.findOne({usuarioId: recuperoClave.usuarioId});

        if (!usuario) {
            throw new CredencialesInvalidasError()
        }

        if (usuario.respuestaSecreta.toLowerCase() != recuperoClave.respuestaSecreta.toLowerCase()) {
            throw new CredencialesInvalidasError()
        }
        
        await usuarioRepository.update({usuarioId: recuperoClave.usuarioId}, {password: bcrypt.hashSync(recuperoClave.newPassword, 8)})
    }

}

const usuarioService = new UsuarioService()
export default usuarioService