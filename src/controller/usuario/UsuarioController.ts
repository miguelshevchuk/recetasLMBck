import express from 'express'
import usuarioService from '../../service/usuario/UsuarioService';
import { ICRUDController } from '../ICRUDController';

class UsuarioController implements ICRUDController{
    getAll: (req: express.Request, res: express.Response, next: express.NextFunction) => any;
    update: (req: express.Request, res: express.Response, next: express.NextFunction) => any;
    delete: (req: express.Request, res: express.Response, next: express.NextFunction) => any;


    public async getOne (req: express.Request, res: express.Response, next: express.NextFunction) {   
        try {
            const userId = (req as any).user.usuarioId
            let usuario = await usuarioService.getUsuario(userId)
            return res.status(200).send(usuario)   
        } catch (e) {
          next(e)
        }
    }

    public async create(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            await usuarioService.create(req.body);
            return res.status(201).send()   
        } catch (e) {
          next(e)
        }
    }

    public async cambiarPass(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const userId = (req as any).user.usuarioId
            await usuarioService.cambiarPass(req.body, userId);
            return res.status(201).send()   
        } catch (e) {
          next(e)
        }
    }

    public async getPreguntaSecreta(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            let pregunta = await usuarioService.getPreguntaSecreta(req.body.email);
            return res.status(200).send(pregunta)   
        } catch (e) {
          next(e)
        }
    }

    public async recuperarClave(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            await usuarioService.recuperarClave(req.body);
            return res.status(201).send()   
        } catch (e) {
          next(e)
        }
    }

}

export const usuarioController = new UsuarioController();