import { Router} from 'express';
import { sesionController } from '../../controller/usuario/SesionController';
import { validateLogin } from '../middleware/auth';



class SesionRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/',validateLogin, sesionController.create);
    }

}

const sesionRoutes: SesionRoutes = new SesionRoutes(); 

export default sesionRoutes.router;
