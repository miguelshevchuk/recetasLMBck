import { getRepository } from 'typeorm'
import { SinCalificarException } from '../../error/recetas/SinCalificarException';
import { ICalificar } from '../../interfaces/recetas/ICalificar';
import { Calificacion} from '../../model/Models';

class CalificacionService{
 
    public async calificar(calificacion:ICalificar, userId:number){
        let calificacionRepository = getRepository(Calificacion);

        let calificacionActual = await calificacionRepository.findOne({usuario: {usuarioId: userId}, receta: {recetaId:calificacion.recetaId}})

        if(!calificacionActual){
            await calificacionRepository.save(new Calificacion(userId, calificacion.recetaId, calificacion.calificacion))
        }else{
            await calificacionRepository.update({calificacionId: calificacionActual.calificacionId}, {
                calificacion: calificacion.calificacion
            })
        }

    }

    public async getCalificacion(recetaId:number, userId:number){
        let calificacionRepository = getRepository(Calificacion);

        let calificacionActual = await calificacionRepository.findOne({usuario: {usuarioId: userId}, receta: {recetaId:recetaId}})

        if(!calificacionActual){
            throw new SinCalificarException()
        }

        return calificacionActual;

    }
}

const calificacionService = new CalificacionService()
export default calificacionService