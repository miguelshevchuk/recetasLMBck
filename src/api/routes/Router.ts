import UsuarioRoutes from "./UsuarioRoutes"
import SesionRoutes from "./SesionRoutes"
import express from 'express'

class Routes {

    public Router = express.Router()

    constructor() {
        this.config();
    }

    private config(): void {
        this.Router.use('/usuario', UsuarioRoutes);
        this.Router.use('/sesion', SesionRoutes);
    }

}

const Router: Routes = new Routes(); 
export default Router.Router

