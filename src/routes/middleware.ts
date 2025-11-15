import { Router } from 'express';
import { middlewareController } from '../controllers/middleware.controller';

const router: Router = Router();

router.use(middlewareController.setTrace);
router.use(middlewareController.userAuthorization);

export const middlewareRouter: Router = router;
