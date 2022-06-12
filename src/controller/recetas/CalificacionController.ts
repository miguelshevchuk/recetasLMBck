import express from 'express'
import calificacionService from '../../service/recetas/CalificacionService';
import { ICRUDController } from '../ICRUDController';

class CalificacionController implements ICRUDController{
    getAll: (req: express.Request, res: express.Response, next: express.NextFunction) => any;
    update: (req: express.Request, res: express.Response, next: express.NextFunction) => any;
    delete: (req: express.Request, res: express.Response, next: express.NextFunction) => any;


    public async getOne (req: express.Request, res: express.Response, next: express.NextFunction) {   
        try {
            const userId = (req as any).user.usuarioId
            let calificacion = await calificacionService.getCalificacion(parseInt(req.params.recetaId), userId)
            return res.status(200).send(calificacion)   
        } catch (e) {
          next(e)
        }
    }

    public async create(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const userId = (req as any).user.usuarioId
            await calificacionService.calificar(req.body, userId);
            return res.status(201).send()   
        } catch (e) {
          next(e)
        }
    }

}

export const calificacionController = new CalificacionController();