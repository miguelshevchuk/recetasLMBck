
import { getRepository } from 'typeorm'
import { RecetaDTO } from '../../dto/recetas/RecetaDTO';
import { ErrorMap } from '../../error/ErrorMap';
import { NoExistenRecetasException } from '../../error/recetas/NoExistenRecetasException';
import { ParametrosRecetaInvalidos } from '../../error/recetas/ParametrosRecetaInvalidos';
import { RecetaNoPropiaException } from '../../error/recetas/RecetaNoPropiaException';
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
            .andWhere("r.estado = :estadoAlta", {estadoAlta : "ALTA"})
            .getMany()
            
        if (!recetas || recetas.length === 0) {
            throw new NoExistenRecetasException()
        }

        return recetas.map(r => new RecetaDTO(r))
    }

    // public async getMyRecipes(usuarioId:number){
    //     let recetasRepository = getRepository(Receta);
    //     const recetas = await recetasRepository.createQueryBuilder('r')
    //         .innerJoinAndSelect('r.usuario', 'u')
    //         .leftJoinAndSelect('r.ingredientes', 'i')
    //         .leftJoinAndSelect('r.calificaciones', 'ca')
    //         .leftJoinAndSelect('r.pasos', 'p')
    //         .innerJoinAndSelect('r.categoria', 'c')
    //         .where("u.usuarioId = :usuarioId", {usuarioId: usuarioId})
    //         .andWhere("r.estado = :estadoAlta", {estadoAlta : "ALTA"})
    //         .getMany()

    //     if (!recetas) {
    //         throw new NoExistenRecetasException()
    //     }

    //     return recetas.map(r => new RecetaDTO(r))
    // }

    public async getRecetaBy(recetaId:number){
        let recetasRepository = getRepository(Receta);
        const receta = await recetasRepository.createQueryBuilder('r')
            .innerJoinAndSelect('r.usuario', 'u')
            .leftJoinAndSelect('r.ingredientes', 'i')
            .leftJoinAndSelect('r.calificaciones', 'ca')
            .leftJoinAndSelect('r.pasos', 'p')
            .innerJoinAndSelect('r.categoria', 'c')
            .where("r.recetaId = :recetaId", {recetaId : recetaId})
            .andWhere("r.estado = :estadoAlta", {estadoAlta : "ALTA"})
            .getOne()

        if (!receta) {
            throw new NoExistenRecetasException()
        }

        return new RecetaDTO(receta)
    }

    public async updateReceta(receta:IUpdateReceta, userId: number){

        if(!receta.ingredientes){
            throw new ParametrosRecetaInvalidos(ErrorMap.PARAMETRO_INGREDIENTES_VACIO);
        }

        if(!receta.pasos){
            throw new ParametrosRecetaInvalidos(ErrorMap.PARAMETRO_PASOS_VACIO);
        }

        let recetasRepository = getRepository(Receta);
        let recetaBD = await recetasRepository.createQueryBuilder('r')
            .innerJoinAndSelect('r.usuario', 'u')
            .where("r.recetaId = :recetaId", {recetaId : receta.recetaId})
            .andWhere("r.estado = :estadoAlta", {estadoAlta : "ALTA"})
            .getOne()


        if(recetaBD.usuario.usuarioId != userId){
            throw new RecetaNoPropiaException()
        }
        
        recetasRepository.update({recetaId: receta.recetaId}, {
            nombre : receta.nombre,
            descripcion : receta.descripcion,
            dificultad : receta.dificultad,
            categoria: {categoriaId: receta.categoria}
        })

        this.guardarIngredientes(receta, recetaBD);

        this.guardarPasos(receta, recetaBD);
       


    }

    public async deleteReceta(recetaId:number, userId: number){

        let recetasRepository = getRepository(Receta);
        let recetaBD = await recetasRepository.createQueryBuilder('r')
            .innerJoinAndSelect('r.usuario', 'u')
            .where("r.recetaId = :recetaId", {recetaId : recetaId})
            .andWhere("r.estado = :estadoAlta", {estadoAlta : "ALTA"})
            .getOne()

        if(!recetaBD){
            throw new NoExistenRecetasException()
        }

        if(recetaBD.usuario.usuarioId != userId){
            throw new RecetaNoPropiaException()
        }

        
        recetasRepository.update({recetaId: recetaId}, {
            estado : "BAJA"
        })    


    }


    private guardarPasos(receta: IUpdateReceta, recetaBD: Receta) {
        let pasosRepository = getRepository(Paso);
        pasosRepository.delete({ receta: { recetaId: receta.recetaId } });

        for (let i = 0; i < receta.pasos.length; i++) {
            let paso = new Paso(receta.pasos[i].pasoNro, receta.pasos[i].paso, recetaBD.recetaId);
            pasosRepository.save(paso);
        }
    }

    private guardarIngredientes(receta: IUpdateReceta, recetaBD: Receta) {
        let ingredientesRepository = getRepository(Ingrediente);
        ingredientesRepository.delete({ receta: { recetaId: receta.recetaId } });

        for (let i = 0; i < receta.ingredientes.length; i++) {
            let ingrediente = new Ingrediente(receta.ingredientes[i], recetaBD.recetaId);
            ingredientesRepository.save(ingrediente);
        }
    }
}

const recetaService = new RecetaService()
export default recetaService