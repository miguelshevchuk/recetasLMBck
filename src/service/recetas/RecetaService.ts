
import { getRepository } from 'typeorm'
import { RecetaDTO } from '../../dto/recetas/RecetaDTO';
import { NoExistenRecetasException } from '../../error/recetas/NoExistenRecetasException';
import { Receta} from '../../model/Models';

class RecetaService{
 
    public async getAll(){
        let recetasRepository = getRepository(Receta);
        const recetas = await recetasRepository.createQueryBuilder('r')
            .innerJoinAndSelect('r.usuario', 'u')
            .leftJoinAndSelect('r.ingredientes', 'i')
            .leftJoinAndSelect('r.calificaciones', 'ca')
            .leftJoinAndSelect('r.pasos', 'p')
            .innerJoinAndSelect('r.categoria', 'c')
            .getMany()
            
        if (!recetas || recetas.length === 0) {
            throw new NoExistenRecetasException()
        }

        return recetas.map(r => new RecetaDTO(r))
    }

    public async getMyRecipes(usuarioId:number){
        console.log(usuarioId)
        let recetasRepository = getRepository(Receta);
        const recetas = await recetasRepository.createQueryBuilder('r')
            .innerJoinAndSelect('r.usuario', 'u')
            .leftJoinAndSelect('r.ingredientes', 'i')
            .leftJoinAndSelect('r.calificaciones', 'ca')
            .leftJoinAndSelect('r.pasos', 'p')
            .innerJoinAndSelect('r.categoria', 'c')
            .where("u.usuarioId = :usuarioId", {usuarioId: usuarioId})
            .getMany()

        if (!recetas) {
            throw new NoExistenRecetasException()
        }

        return recetas.map(r => new RecetaDTO(r))
    }

    public async getRecetaBy(recetaId:number){
        let recetasRepository = getRepository(Receta);
        const receta = await recetasRepository.createQueryBuilder('r')
            .innerJoinAndSelect('r.usuario', 'u')
            .leftJoinAndSelect('r.ingredientes', 'i')
            .leftJoinAndSelect('r.calificaciones', 'ca')
            .leftJoinAndSelect('r.pasos', 'p')
            .innerJoinAndSelect('r.categoria', 'c')
            .where("r.recetaId = :recetaId", {recetaId : recetaId})
            .getOne()

        if (!receta) {
            throw new NoExistenRecetasException()
        }

        return new RecetaDTO(receta)
    }

}

const recetaService = new RecetaService()
export default recetaService