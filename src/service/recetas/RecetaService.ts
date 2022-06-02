
import { getRepository } from 'typeorm'
import { RecetaDTO } from '../../dto/recetas/RecetaDTO';
import { NoExistenRecetasException } from '../../error/recetas/NoExistenRecetasException';
import { IUpdateReceta } from '../../interfaces/recetas/IUpdateReceta';
import { Ingrediente, Paso, Receta} from '../../model/Models';
import recetaMapper from '../mapper/RecetaMapper';

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

    public async updateReceta(receta:IUpdateReceta, userId: number){

        if(!receta.ingredientes){

        }

        if(!receta.pasos){
            
        }

        let recetasRepository = getRepository(Receta);
        let recetaBD = await recetasRepository.findOne({recetaId: receta.recetaId})

        if(recetaBD.usuario.usuarioId != userId){
            //todo Excepcion por receta no propia
        }

        
        recetasRepository.update({recetaId: receta.recetaId}, {
            nombre : receta.nombre,
            descripcion : receta.descripcion,
            dificultad : receta.dificultad
        })

        this.guardarIngredientes(receta, recetaBD);

        this.guardarPasos(receta, recetaBD);
       


    }


    private guardarPasos(receta: IUpdateReceta, recetaBD: Receta) {
        let pasosRepository = getRepository(Paso);
        pasosRepository.delete({ receta: { recetaId: receta.recetaId } });

        for (let i = 0; i < receta.pasos.length; i++) {
            let paso = new Paso(receta.pasos[i].pasoNro, receta.pasos[i].paso, recetaBD);
            pasosRepository.create(paso);
        }
    }

    private guardarIngredientes(receta: IUpdateReceta, recetaBD: Receta) {
        let ingredientesRepository = getRepository(Ingrediente);
        ingredientesRepository.delete({ receta: { recetaId: receta.recetaId } });

        for (let i = 0; i < receta.ingredientes.length; i++) {
            let ingrediente = new Ingrediente(receta.ingredientes[i], recetaBD);
            ingredientesRepository.create(ingrediente);
        }
    }
}

const recetaService = new RecetaService()
export default recetaService