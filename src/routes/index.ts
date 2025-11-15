import { Router } from 'express';

import { healthRouter } from './health.route';
import { middlewareRouter } from './middleware';
import { userRouter } from './user.route';

const router: Router = Router();

router.use('/', middlewareRouter);
router.use('/users', userRouter);
router.use('/health', healthRouter);

export const api: Router = router;
