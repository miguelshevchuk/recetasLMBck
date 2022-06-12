import express from 'express'
import recetaService from '../../service/recetas/RecetaService';
import usuarioService from '../../service/usuario/UsuarioService';
import { ICRUDController } from '../ICRUDController';

class RecetasController implements ICRUDController{


    public async getOne (req: express.Request, res: express.Response, next: express.NextFunction) {   
        try {
            let receta = await recetaService.getRecetaBy(parseInt(req.params.recetaId))
            return res.status(200).send(receta)   
        } catch (e) {
          next(e)
        }
    }

    public async getAll (req: express.Request, res: express.Response, next: express.NextFunction) {   
        try {
            let recetas = await recetaService.getAll()
            return res.status(200).send(recetas)   
        } catch (e) {
          next(e)
        }
    }

    // public async getMyRecipes (req: express.Request, res: express.Response, next: express.NextFunction) {   
    //     try {
    //         const userId = (req as any).user.usuarioId
    //         let recetas = await recetaService.getMyRecipes(userId)
    //         return res.status(200).send(recetas)   
    //     } catch (e) {
    //       next(e)
    //     }
    // }


    public async create(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const userId = (req as any).user.usuarioId
            await recetaService.create(req.body, userId);
            return res.status(201).send()   
        } catch (e) {
          next(e)
        }
    }


    public async update(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const userId = (req as any).user.usuarioId
            await recetaService.updateReceta(req.body, userId);
            return res.status(200).send()   
        } catch (e) {
          next(e)
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const userId = (req as any).user.usuarioId
            await recetaService.deleteReceta(parseInt(req.params.recetaId), userId);
            return res.status(200).send()   
        } catch (e) {
          next(e)
        }
    }

}

export const recetasController = new RecetasController();