import { Router } from 'express';

import { healthRouter } from './health.route';
import { middlewareRouter } from './middleware';
import { userRouter } from './user.route';
import { authRouter } from './auth.route';

const router: Router = Router();

router.use('/', middlewareRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/health', healthRouter);

export const v1: Router = router;
