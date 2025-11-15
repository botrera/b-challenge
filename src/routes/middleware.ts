import { Router } from 'express';
import { middlewareController } from '../controllers/middleware.controller';

const router: Router = Router();

router.use(middlewareController.setTrace);

export const middlewareRouter: Router = router;
