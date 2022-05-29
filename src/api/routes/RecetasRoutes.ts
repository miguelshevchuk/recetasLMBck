import { Router} from 'express';
import { recetasController } from '../../controller/recetas/RecetasController';
import { authenticated } from '../middleware/auth';

class RecetasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', recetasController.getAll);
        this.router.get('/me', authenticated, recetasController.getMyRecipes);
    }

}

const recetasRoutes: RecetasRoutes = new RecetasRoutes(); 

export default recetasRoutes.router;
