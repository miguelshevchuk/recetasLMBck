
import { url } from 'inspector';
import { getRepository } from 'typeorm'
import { RecetaDTO } from '../../dto/recetas/RecetaDTO';
import { ErrorMap } from '../../error/ErrorMap';
import { NoExistenRecetasException } from '../../error/recetas/NoExistenRecetasException';
import { ParametrosRecetaInvalidos } from '../../error/recetas/ParametrosRecetaInvalidos';
import { RecetaNoPropiaException } from '../../error/recetas/RecetaNoPropiaException';
import { INuevaReceta } from '../../interfaces/recetas/INuevaReceta';
import { IUpdateReceta } from '../../interfaces/recetas/IUpdateReceta';
import { Ingrediente, Paso, Receta} from '../../model/Models';
import cloudinaryService, { CloudinaryService } from '../cloudinary/CloudinaryService';
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

        if(!receta.preparacion){
            throw new ParametrosRecetaInvalidos(ErrorMap.PARAMETRO_PASOS_VACIO);
        }

        let recetasRepository = getRepository(Receta);
        let recetaBD = await recetasRepository.createQueryBuilder('r')
            .innerJoinAndSelect('r.usuario', 'u')
            .where("r.recetaId = :recetaId", {recetaId : receta.id})
            .andWhere("r.estado = :estadoAlta", {estadoAlta : "ALTA"})
            .getOne()

        if(recetaBD.usuario.usuarioId != userId){
            throw new RecetaNoPropiaException()
        }
        
        await recetasRepository.update({recetaId: receta.id}, {
            nombre : receta.nombre,
            descripcion : receta.descripcion,
            dificultad : receta.dificultad,
            categoria: {categoriaId: receta.categoria}
        })

        await this.guardarIngredientes(receta.ingredientes, recetaBD);

        await this.guardarPasos(receta.preparacion, recetaBD);
       


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


    private async guardarPasos(pasos: {pasoNro, paso}[], recetaBD: Receta) {
        let pasosRepository = getRepository(Paso);
        pasosRepository.delete({ receta: { recetaId: recetaBD.recetaId } });

        for (let i = 0; i < pasos.length; i++) {
            let paso = new Paso(pasos[i].pasoNro, pasos[i].paso, recetaBD.recetaId);
            await pasosRepository.save(paso);
        }
    }

    private async guardarIngredientes(ingredientes: string[], recetaBD: Receta) {
        let ingredientesRepository = getRepository(Ingrediente);
        ingredientesRepository.delete({ receta: { recetaId: recetaBD.recetaId } });

        for (let i = 0; i < ingredientes.length; i++) {
            let ingrediente = new Ingrediente(ingredientes[i], recetaBD.recetaId);
            await ingredientesRepository.save(ingrediente);
        }
    }

    public async create(nuevaReceta:INuevaReceta, userId:number){
        let recetaRepository = getRepository(Receta);

        let urlImagen = await cloudinaryService.uploadImage(nuevaReceta.imagen)

        let receta = recetaMapper.mapNuevaReceta(nuevaReceta, userId, urlImagen);

       receta = await recetaRepository.save(receta);

       await this.guardarIngredientes(nuevaReceta.ingredientes, receta);
       await this.guardarPasos(nuevaReceta.preparacion, receta);

    }
}

const recetaService = new RecetaService()
export default recetaService