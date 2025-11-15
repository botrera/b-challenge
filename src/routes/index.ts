import { Router } from 'express';

import { healthRouter } from './health.route';
import { middlewareRouter } from './middleware';
import { transactionRouter } from './transaction.route';

const router: Router = Router();

router.use('/', middlewareRouter);
router.use('/health', healthRouter);
router.use('/transactions', transactionRouter);

export const api: Router = router;
