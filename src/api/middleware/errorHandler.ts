import express from 'express'
import { LMError } from '../../error/LMError'

export const errorHandler = [
  async (
    err,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {

    if(err instanceof LMError){
      console.log(err)
      res.status(err.status).send(err.mensaje)
    }else{
      console.log(err)
      res.status(500).send("Ocurrio un error inesperado")
    }    

  },
]