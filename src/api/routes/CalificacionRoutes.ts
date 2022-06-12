import { Router} from 'express';
import { calificacionController } from '../../controller/recetas/CalificacionController';
import { authenticated } from '../middleware/auth';

class CalificacionRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/:recetaId', authenticated, calificacionController.getOne);
        this.router.post('/',authenticated,  calificacionController.create);
    }

}

const calificacionRoutes: CalificacionRoutes = new CalificacionRoutes(); 

export default calificacionRoutes.router;
