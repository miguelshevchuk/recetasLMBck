import UsuarioRoutes from "./UsuarioRoutes"
import SesionRoutes from "./SesionRoutes"
import express from 'express'
import RecetasRoutes from "./RecetasRoutes";
import RecetaRoutes from "./RecetaRoutes";
import CalificacionRoutes from "./CalificacionRoutes";

class Routes {

    public Router = express.Router()

    constructor() {
        this.config();
    }

    private config(): void {
        this.Router.use('/usuario', UsuarioRoutes);
        this.Router.use('/sesion', SesionRoutes);
        this.Router.use('/recetas', RecetasRoutes);
        this.Router.use('/receta', RecetaRoutes);
        this.Router.use('/calificacion', CalificacionRoutes);
    }

}

const Router: Routes = new Routes(); 
export default Router.Router

