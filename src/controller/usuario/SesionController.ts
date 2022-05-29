import express from 'express'
import sesionService from '../../service/usuario/SesionService';
import { ICRUDController } from '../ICRUDController';

class SesionController implements ICRUDController{
    getAll: (req: express.Request, res: express.Response, next: express.NextFunction) => any;
    update: (req: express.Request, res: express.Response, next: express.NextFunction) => any;
    getOne: (req: express.Request, res: express.Response, next: express.NextFunction) => any;
    delete: (req: express.Request, res: express.Response, next: express.NextFunction) => any;


    public async create (req: express.Request, res: express.Response, next: express.NextFunction) {   
        try {
            let login = req.body;
            let jwt = await sesionService.login(login)
            return res.status(201).send(jwt)   
        } catch (e) {
          next(e)
        }
    }

}

export const sesionController = new SesionController();