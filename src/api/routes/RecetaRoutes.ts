import { Router} from 'express';
import { recetasController } from '../../controller/recetas/RecetasController';
import { authenticated } from '../middleware/auth';

class RecetasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/:recetaId', recetasController.getOne);
        this.router.put('/',authenticated,  recetasController.update);
        this.router.post('/',authenticated,  recetasController.create);
        this.router.delete('/:recetaId',authenticated,  recetasController.delete);
    }

}

const recetasRoutes: RecetasRoutes = new RecetasRoutes(); 

export default recetasRoutes.router;
